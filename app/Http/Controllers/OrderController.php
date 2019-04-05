<?php

namespace App\Http\Controllers;

use App\Exceptions\Order\NotOwnerException;
use App\Order\ActionFactory;
use App\Order\Actions\Context;
use App\Order\ActionViewFactory;
use App\Order\Order;
use App\Order\State;
use Illuminate\Http\Request;
use App\ListModels;
use App\User;


class OrderController extends Controller
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;

    }

    public function myList()
    {
        $listModels = new ListModels("orders",
        ['id', 'subject', 'action', 'assigned_by', 'created_at', 'order_state_id', "data"],
        ['created_by']
        );

        $listModels->setDefaultSort("id", "desc");
        $filter = $this->request->filter;
        $filter["created_by"] = $this->request->user()->id;
        $this->request->merge(["filter" => $filter]);

        $result =  $listModels->getPaginate($this->request);
        $collection = $result->getCollection();

        $iterator = $collection->getIterator();

        $assignedUsers = [];


        while($iterator->valid()) {
            $item = $iterator->current();
            $item->subject = __($item->subject);
            $item->context = Context::handle($item->action, json_decode($item->data));

            $item->order_state_id = __(State::getName($item->order_state_id));

            $userId = $item->assigned_by;
            if(!isset($assignedUsers[$userId]))
            {
                $assignedUsers[$userId] = User::find($userId);
            }

            $user = $assignedUsers[$userId];
            $fio = trim($user->lastname . " " . $user->firstname);
            $item->assigned_user = $user->login .  ((empty($fio))? "":  " \\ " . $fio);

            $iterator->next();
        }

        return $result;
    }

    public function assignedList()
    {
        $listModels = new ListModels("orders",
            ['id', 'action', 'subject', 'created_at', 'created_by_login', 'order_state_id', "data"],
            ['created_by']
        );

        $listModels->setDefaultSort("id", "desc");
        $filter = $this->request->filter;

        $filter["assigned_by"] = $this->request->user()->id;
        $filter["order_state_id"] = State::APPROVE;


        $this->request->merge(["filter" => $filter]);

        $result =  $listModels->getPaginate($this->request);
        $collection = $result->getCollection();

        $iterator = $collection->getIterator();

        while($iterator->valid()) {
            $item = $iterator->current();
            $item->subject = __($item->subject);
            $item->context = Context::handle($item->action, json_decode($item->data));
            $item->order_state_id = __(State::getName($item->order_state_id));
            $iterator->next();
        }

        return $result;

    }

    public function my($id)
    {
        $order = Order::find($id);
        try {
            $this->isMyOrder($order);
            $view = ActionViewFactory::create($order->action);

            return response()->success([
                "subject" => __($order->subject),
                "action" => $order->action,
                "state" => $order->order_state_id,
                "info" => $view->info($order)
            ]);

        } catch (NotOwnerException $e) {
            return response()->error($e->getMessage());
        }
    }

    public function assigned($id)
    {
        $order = Order::find($id);
        try {
            $this->isAssignedOrder($order);
            $view = ActionViewFactory::create($order->action);

            return response()->success([
                "subject" => __($order->subject),
                "action" => $order->action,
                "state" => $order->order_state_id,
                "info" => $view->info($order)
            ]);

        } catch (NotOwnerException $e) {
            return response()->error($e->getMessage());
        }
    }


    public function cancelMy() {
        $id = $this->request->input("id");
        $order = Order::find($id);

        try {
            $this->isMyOrder($order);
            $order->order_state_id = State::CANCEL;
            $order->save();
            return response()->success(["id" => $id, "state" => $order->order_state_id]);

        } catch (NotOwnerException $e) {
            return response()->error($e->getMessage());
        }

    }

    public function reject() {
        $id = $this->request->input("id");
        $order = Order::find($id);

        try {
            $this->isAssignedOrder($order);
            $order->order_state_id = State::REJECT;
            $order->save();
            return response()->success(["id" => $id, "state" => $order->order_state_id]);

        } catch (NotAssignedUserException $e) {
            return response()->error($e->getMessage());
        }
    }

    public function done(){
        $id = $this->request->input("id");
        $order = Order::find($id);

        try {
            $this->isAssignedOrder($order);
            $this->request->merge(["action" => $order->action]);

            $action = ActionFactory::create($this->request);
            $order = $action->handle($id);
            $order->save();
            return response()->success(["id" => $id, "state" => $order->order_state_id]);


        } catch (NotAssignedUserException $e) {
            return response()->error($e->getMessage());
        }


    }

    private function isMyOrder(Order $order) {
        $user = $this->request->user();

        if($order->created_by != $user->id) {
            throw new NotOwnerException("Not Order Owner");
        }
    }

    private function isAssignedOrder(Order $order) {
        $user = $this->request->user();

        if($order->assigned_by != $user->id) {
            throw new NotAssignedUserException("Not assigned user");
        }
    }



}
