<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 27.03.2019
 * Time: 11:14
 */

namespace App\Traits;

trait Observervable {


    private $observers = [];


    public function attach(\SplObserver $observer, string $event = "*"): void
    {
        $this->initEventGroup($event);

        $this->observers[$event][] = $observer;
    }

    private function initEventGroup(string $event = "*"): void
    {
        if (!isset($this->observers[$event])) {
            $this->observers[$event] = [];
        }
    }

    public function detach(\SplObserver $observer, string $event = "*"): void
    {
        foreach ($this->getEventObservers($event) as $key => $s) {
            if ($s === $observer) {
                unset($this->observers[$event][$key]);
            }
        }
    }

    private function getEventObservers(string $event = "*"): array
    {
        $this->initEventGroup($event);
        $group = $this->observers[$event];
        $all = $this->getAll();

        return array_merge($group, $all);
    }

    private function getAll() {
        if(!isset($this->observers["*"]))
               $this->observers["*"] = [];

        return $this->observers["*"];
    }


    public function notify(string $event = "*", $data = null): void
    {
        foreach ($this->getEventObservers($event) as $observer) {
            $observer->update($this, $event, $data);
        }
    }

}