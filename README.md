# Notification-PROD
Live notification customer kitchen driver


# // To run this project you need following 

1) set ENV key value  to  X_API_KEY  // This is the key value will be sent from front end 
2) run npm i
3) run run dev ( for local )

# ENV File  Updated : 3/11/2025






Postman Payload 

http://localhost:3007/NotifyUsers

{
    "data": {
        "email": "syed5511@gmail.com",
        "delivery_type": "home delivery",
        "kitchen_name": "9001postmankitchen",
        "internal_order_status": "order accepted by kitchen",
        "joined_order_no": "11/30/2024-JOIN9619403833", // Sent key joined_order_no if updating join order 
        "order_no": "11/30/2024-MEAL1511952339", // sent order_no when its NOT join order
        "delivery_time_slot": "11:30 am - 12:15 pm"
    },
    "whomToNotify": "kitchen" // [ 'customer' , "customer-driver" ,'customer-kitchen','notify-kitchen' ,'kitchen']
}
