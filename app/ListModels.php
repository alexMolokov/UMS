<?php

namespace App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListModels
{
        private $table = "";
        private $fields = [];
        private $filters = [];
        private $defaultSort;

    /**
     * ListModels constructor.
     * @param $table string
     * @param $fields array
     * @param $filters array
     */
        public function __construct($table, array $fields, array $filters)
        {
            $this->table = $table;
            $this->fields = $fields;
            $this->filters = $filters;
        }

     public function setDefaultSort($field, $direction) {
            $this->defaultSort = "$field.$direction";
    }


    public function getPaginate(Request $appRequest)
    {
        $data = $appRequest->only( 'sort', "filter");
        $data["page"] = request('page', $default = 1);
        $data['per_page'] = request('per_page', $default = 10);

        $request = $this->_get($data);
        return  $request->paginate($data['per_page']);
    }

    public function getRawData()
    {
        return $request = $this->_get()->get();
    }


    private function _get($data = [])
    {
        $request =  DB::table($this->table)->select($this->fields);

        if(isset($data["filter"]))
        {
            foreach ($this->filters as $filter) {
                $request->orWhere($filter, 'like', $data["filter"] . '%');
            }
        }

        $sort = data_get($data, "sort", $this->defaultSort);
        if($sort)
        {
            $ar = explode(".", $sort);
            $sortBy = $ar[0];
            $direction = $ar[1];
            $request->orderBy($sortBy, $direction);
        }
        return $request;
    }

}
