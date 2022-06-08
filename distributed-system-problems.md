---
permalink: /2
---

[⬅ Back](/) 

Distributed system problems

# Replication lag problems

## Reading Your Own Writes

A user wants to read the writes he made, even if it is from a read replica that has lagging replication.

### *read-after-write consistency* or *read-your-writes consistency*

- user modifications read from leader (eg. own profile)
- read everything from leader for a minute after a modification
- store timestamp (logical or physical) to route request to replica thats caught up enough

## Monotonic reads

User reads from replica with small lag, then from replica with great lag, and sees new data, then doesn't see it anymore (e.g. refreshing the page)

### Monotonic reads consistency

- a user should make reads from the same replica

## Consistent Prefix Reads

Write 1 happens before Write 2, but Write 2 gets replicated to a partition follower earlier than Write 1, so reads from one partition happen in a different order

### Consistent Prefix Reads consistency

Keep track of causal dependencies.



# Conflict resolution approaches

### Last write wins

### Replica priority order wins

### Merge the values (e.g concat)

### Conflict recording replica, that user can later resolve
    - on write (conflict handler)
    - on read (user handling)

### CRDTs

### Mergeable data structures (e.g git)

### Operational transformation

