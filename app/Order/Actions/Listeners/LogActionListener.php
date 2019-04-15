<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 01.04.2019
 * Time: 11:05
 */

namespace App\Order\Actions\Listeners;


class LogActionListener implements \SplObserver
{
        public function update (\SplSubject $subject, $event = "eventName", $data = [])
        {
           try {
               $logger = $this->getLogger();
               $data = $data + ["event" => $event];

               $logger->info($event, $data);

           } catch(\Exception $exception ) {

           }
        }

        protected function getLogger() {

            return resolve("Psr\Log\LoggerInterface\Action");
        }
}