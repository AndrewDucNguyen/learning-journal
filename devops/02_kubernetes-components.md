# Kubernetes Components
- Video reference: https://www.youtube.com/results?search_query=kubernetes+nana
- Foundation: it manages containers
    - Open source container orchestration tool

## Features of orechestration
- High availability; no downtime. Always accessible by users
- Scalability; high performance. Loads fast and high response rate
- Disaster recovery; backup and restore data if anything fails so it doesn't lose any data

## Basic Architecture
- A cluster is made up of a master/control node and a couple of worker node

### Worker Node
-  Worker nodes have a Kubelet processor running on it
    - primary "node agent"
    - Kubernetes process that makes it possible for cluster to communicate with eachother and execute some tasks on the nodes
    - Each worker node has docker container application deployed on it
    - Where the actual work is happening. Where teh applications are running
    - Has most load, much bigger, more resources

### Master/Control Node
- Runs several Kubernetes processess that are necessary to run/manage clusters properly
    1. API Server (also container) - entry point to K8's cluster
        - UI talks to it
        - API talks to it
        - CLI talks to it
    2. Controller mananger - keeps overview of what is happening in the clustser
    3. Scheduler - Responsible for scheduling containers on different nodes based on workload and server resources available on each node
    4. etcd - Key value storage. Holds the current state of the kubernetes clusters
        - Has configuration data, and status data of each node and container inside of that node
        - Snapshots of clusters can be recovered from this
- Only runs a handful of programs/application
- This is much more important. Has to have backup (at least 2 masters/control node)

### Virtual Network
- Lets the nodes talk to each other (master/control & worker)
- Turns all the nodes inside the cluser into 1 powerful machine (unified machine)

## Basic Concepts 

### Pods
- Smallest unit that we will configure and interact with
- Record of a container
    - Pods holds containers
- In the worker node
    - Usually 1 pod per application
- Virtual Network assigns each Pod is own IP address
    - It's own self-contained server
    - Pod's communicate with eachother with the IP addresses
- We only work with Pods in Kubernetes
- Pods are ephemeral components - it dies easily
- Pods are recreated frequently
    - Whenever it gets restarted/recreated, Pods get new IP addresses
    - This is where service comes in; it is a replacement or placed ontop of the IP addresses so whenever the Pod dies, the service stays in place and doesn't get a new IP address
- Services have two functionalities
    1. Permanet IP address - used to communicate between pods
    2. Load Balancer

### Kubernetes configuration
- All configurations go through the Master/Control node's API server
- UI/API/CLI all talk to the API server and send their request to here. It is the main/only entrypoint to the cluster
    - Has to be in YAML or JSON format
    - It is in declarative form; `Is == Should`
- Controller Manager checks: `desired state == actual state`

## Kubernetes Architecture
- Talk about in depth the difference between Master/Control node and worker node

### Worker machine/node
- Example with 1 node with 2 application pods running on it
- Each node has multiple pods on it
- 3 processes must be installed on every Node
    - Work nodes do the actual work
    1. Container runtime
    2. Kubelet 
        - Interacts with both the container and node
        - Starts the pod with a container inside
        - Services
            - Communication
            - Catches the request directed to the Pod/Application like DB, and forwards it to the respected pod
    3. Kube proxy
        - Forwarding requests
        - Makes sure the communication works in a performant way and the correct node/machine

### How to interact with clusters
- How to:
    1. Schedule pod?
    2. Monitor?
    3. Re-schedule/re-start pod?
    4. Join a new node?
    - Managing processes are done by Master/Control node

### Master/Control Node/Processes
- Has different processes running inside. There are 4 processes on every master node
    1. API Server
        - Interact using client side using cluster gateway
        - Acts as a gatekeeper for authentication
        - When some request comes in to the cluster, it'll hit the **API server**, the **API server** will validate the request and forward it to other processes in order to schedule the Pod
        - Good for security because we only have 1 entrypoint for the cluster
    2. Scheduler
        - When you send the **API server** a request to schedule a new pod, it'll schedule new Pod then send it to validate the request in the **API Server** then hand it over to the **Scheduler** then it'll start a new Pod in the worker node
        - Has intelligent way to decide on which worker node the next pod will be scheduled
        - Scheduler just decides on which Node new Pod should be scheduled
        - The process that actual does the scheduling or starts the pod is the **Kubelet**
    3. Controller Manager
        - Detects cluster state changes
            - Dies, restarts, etc
        - Once it detects a state change, the **Controller Manager** will send a request to the **Scheduler** to reschedule the dead pods then the same process happens, where the **Scheduler** decides which worker node to put it on. Whatever node has the most space or least amount of used resource
    4. etcd
        - Key value store of a cluster state
        - Cluster Brain basically
            - All the mechanism (scheduler, etc) works because of its data
        - All the changes gets saved/updated in this key value store (will keep when the node dies or etc)
        - What is not stored in here is the actual application data
            - Just cluster state information for the master/control to communication with worker and vice versa
- Cluster is usually made up of multiple master/control

## Services / Ingress

### Secrets 

### ConfigMap

### Volumes