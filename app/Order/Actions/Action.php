<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 27.03.2019
 * Time: 16:03
 */

namespace App\Order\Actions;



use App\Order\Order;
use App\Traits\Observervable;
use Illuminate\Http\Request;
use App\Order\State;
use App\Order\CalculateAccepter;

abstract class Action implements \SplSubject
{
    use Observervable;

    protected $request;
    protected $order;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    protected function  isApproved()
    {
        return ($this->request->input("is_approved") == 1);
    }

    protected function setAssignUser() {

        $ouId = $this->getStartOuId();
        $calculator = new CalculateAccepter($this->request->user());
        $assignedUser = $calculator->getAccepter($this->getPermissionName(), $ouId);
        $this->order->assigned_by = $assignedUser->id;
     }



    public function handle($orderId = null)  {

      if(isset($orderId))  {
           $this->setExistsOrder($orderId);
      } else {
          $this->setNewOrder();
      }


      if($this->isApproved()) {
            $this->setAssignUser();
            $this->order->save();
            return $this->order;
      }
      else {
          return $this->execute();
      }

    }


    protected function setNewOrder() {
        $data = [
            "action" => $this->getType(),
            "data" => json_encode($this->getData()),
            "subject" => $this->getSubject(),
            "order_state_id" => State::APPROVE,
            "created_by" => $this->request->user()->id,
            "created_by_login" => $this->request->user()->login,
        ];

        $this->order =  ($this->isApproved())? Order::create($data) : new Order($data);
    }

    protected function setExistsOrder($orderId) {
        $order = Order::find($orderId);
        $order->update([
            "order_state_id" => State::APPROVE,
            "modified_by" => $this->request->user()->id,
            "modified_by_login" => $this->request->user()->login
        ]);

        $this->order = $order;
    }

    protected function getUserService()
    {
        return  resolve("EncryptServer\Interfaces\IUserInterface");
    }

    protected function getUnitService()
    {
        return  resolve("EncryptServer\Interfaces\IOrganizationUnit");
    }

    protected function getNotifyData($obj){
        $user = $this->request->user();
        $notifyData = [
            "created_by" => $this->order->created_by,
            "created_by_login" => $this->order->created_by_login,
            "modified_by" => $user->id,
            "modified_by_login" => $user->login,
            "data" => (array) $obj
        ];
        return $notifyData;
    }

    abstract function getStartOuId();
    abstract function execute() : Order;
    abstract function getPermissionName(): string;

}