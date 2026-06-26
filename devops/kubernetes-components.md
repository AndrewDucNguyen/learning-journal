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

### Services / Ingress

### Secrets 

### ConfigMap

### Volumes