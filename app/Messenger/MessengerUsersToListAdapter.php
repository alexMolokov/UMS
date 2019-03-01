<?php
namespace App\Messenger;
use Illuminate\Http\Request;

class MessengerUsersToListAdapter
{
    private $response;
    private $request;

    public function __construct(\EncryptServer\Response\Response $response, Request $request)
    {
        $this->response = $response;
        $this->request = $request;
    }

    public function getList(){
        if($this->response->getStatus())
        {
            $response = $this->response->getResponse()["searchResult"];

            $data = [];
            $response->rewind();
            while($response->valid())
            {
                $data[] = $response->current();
                $response->next();
            }
            $result = [
                "current_page" => $response->getPage() + 1,
                "data" => $data,
                "from" => $this->_getFrom(),
                "last_page" =>  $this->_getLastPage($response->getTotal()),
                "next_page_url" => $this->_getNextPageUrl($response->getTotal()),
                "path" =>  $this->request->url(),
                "per_page" => $this->request->input("per_page"),
                "prev_page_url" => $this->_getPrevPageUrl($response->getTotal()),
                "to" => $this->_getTo($response->getTotal()) ,
                "total" => $response->getTotal()
            ];

            return $result;

        }
    }

    private function _getFrom() {
        return $this->request->input("per_page")*($this->request->input("page")-1) + 1;
    }

    private function _getTo($total) {
        $to = $this->_getFrom() + $this->request->input("per_page") - 1;
        if($to > $total) return $total;
        return $to;
    }

    private function _getLastPage($total) {
        return ceil($total/ $this->request->input("per_page"));
    }

    private function _getNextPageUrl($total) {
        $next = $this->request->input("page") + 1;
        if($next <= $this->_getLastPage($total)) {
            return $this->request->url() . "?page=" . $next;
        }
    }

    private function _getPrevPageUrl($total) {
        $prev = $this->request->input("page") - 1;
        if($prev > 0) {
            return $this->request->url() . "?page=" . $prev;
        }
    }

}