# Architecture

## High-Level Flow

Producer → Queue → Consumer → Channel

## Components

### Producer

Responsible for emitting events into the queue.

### Queue (BullMQ)

Acts as the event bus and buffers jobs.

### Consumer

Processes events and triggers notification logic.

### Channels

Handles delivery (Email, SMS, Push).
