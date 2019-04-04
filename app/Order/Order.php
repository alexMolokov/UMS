<?php

namespace App\Order;

use App\Traits\Observervable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Order extends Model
{
    use Observervable;

    private $request;
    private $action;
    private $user;


    protected $fillable = [
        'subject', "action" , "data", "context", "order_state_id", "created_by", "modified_by", "created_by_login", "modified_by_login", "assigned_by"
    ];


    public function handle(Request $request)
    {
        $this->action = ActionFactory::create($request);

        $this->request = $request;
        $this->user = $request->user();

        $order = $this->handleOrder();

        if($this->isApproved()) {

            $result = [];

            $units = $this->user->organizationUnits()->get();
            foreach($units as $unit){
                $id = $unit->getOriginal("id");
                $result[]  = $id;
            }


            return new OrderResult(OrderResult::ORDER_TYPE,
                ["id" => $order->id]
            );
        }

        $this->action->execute($order);

        return new OrderResult(OrderResult::EXECUTE_TYPE);
    }

    private function handleOrder() : Order {
        $orderId = $this->getOrderIdFromRequest();

        if(is_null($orderId))
            return $this->getOrder();

        return $this->updateOrder();
    }

    private function getOrder(): Order  {
        $data = [
            "action" => $this->action->getType(),
            "data" => json_encode($this->action->getData()),
            "subject" => $this->action->getSubject(),
            "order_state_id" => State::APPROVE,
            "created_by" => $this->user->id,
            "created_by_login" => $this->user->login,
        ];

        if($this->isApproved())
                    return  Order::create($data);

        return new Order($data);
    }

    private function updateOrder() :Order {
        $orderId = $this->getOrderIdFromRequest();

        $order = Order::find($orderId);
        $order->update([
            "order_state_id" => State::APPROVE,
            "modified_by" => $this->user->id,
            "modified_by_login" => $this->user->login
        ]);

        return $order;
    }


    private function getOrderIdFromRequest() {
        return  $this->request->input("order_id");
    }

    private function isApproved()
    {
            return ($this->request->input("is_approved") == 1);
    }

}
