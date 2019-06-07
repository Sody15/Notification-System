package com.notification.system.controllers;

import java.util.Random;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.notification.system.models.Notification;

@Controller
public class NotificationController {
	@MessageMapping("/notifications")
    @SendTo("/topic/notifications")
    public Notification notifications(Notification notification) throws Exception {
    	System.out.println(notification.toString());
    	
    	// Simulate delay
    	long delay = (new Random().nextInt(10) + 1) * 1000;
    	System.out.println("Second Delay - " + (delay / 1000));
        Thread.sleep(delay);
        
        return new Notification(notification.getMessage(), notification.getType());
    }
}
