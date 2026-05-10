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


# Day 2 Flow

1. API triggers producer
2. Producer pushes job into Redis queue
3. Worker listens to queue
4. Worker processes jobs
5. BullMQ retries failed jobs automatically

# Day 3 Learnings

1. Persisted notifications in database
2. Added notification lifecycle states:
   - PENDING
   - PROCESSING
   - SENT
   - FAILED
3. Worker updates DB status during processing
4. Retry counts are tracked
5. Queue payload now contains notificationId