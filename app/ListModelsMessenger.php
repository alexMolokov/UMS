<?php

namespace App;
use App\Messenger\MessengerUsersToListAdapter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListModelsMessenger
{
        private $service;
        private $fields = [];
        private $filters = [];
        private $defaultSort;

    /**
     * ListModels constructor.
     * @param $service
     * @param $fields array
     * @param $filters array
     */
        public function __construct($service, $fields, $filters)
        {
            $this->service = $service;
            $this->fields = $fields;
            $this->filters = $filters;
        }

     public function setDefaultSort($field, $direction)
     {
            $this->defaultSort = "$field.$direction";
     }


    public function getPaginate(Request $request)
    {
        $data = $request->only('page', 'per_page', 'sort', "filter");
        $data = $this->_get($data);

        $response = $this->service->find($data["filter"], $data);

        $adapter = new MessengerUsersToListAdapter($response, $request);
        return JsonResponse::create($adapter->getList());
    }



    private function _get($data = [])
    {
        $request =  [
            "page" =>  $data["page"] - 1,
            "count" => $data["per_page"],
            "sort" => "login",
            "asc" => true,
            "filter" => []
        ];

        if(isset($data["filter"]))
        {
            foreach ($this->filters as $filter) {
                $request["filter"][$filter] = $data["filter"] . "*" ;
            }
        }
        $sort = data_get($data, "sort", $this->defaultSort);
        if($sort)
        {
            $ar = explode(".", $sort);
            $request["sort"] =  $ar[0];
            $direction = $ar[1];
            $request["asc"] =  ($direction == "asc")? true: false;
        }

        return $request;
    }

}
