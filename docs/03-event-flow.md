# Event Flow

## USER_REGISTERED Event

1. User registers in system
2. Producer emits USER_REGISTERED event
3. Event pushed to Redis queue
4. Consumer picks job
5. Notification service processes it
6. Email sent (future implementation)

## Payload Example

{
"userId": 1,
"email": "[test@gmail.com](mailto:test@gmail.com)",
"name": "Lakshay"
}
