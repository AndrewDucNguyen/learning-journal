# Kubernetes

## What is Kubernetes
- Definition: Open source container orchestration tool developed by Google
    - Manages containers
    - Helps you manage containerized application in different deployment environments

### What problems does kubernetes solve?
- Trend with Monolith -> Microservices. Increased usage of containers
- Managing the load of containers across multiple services makes it really difficult or even impossible
    - Demand for a proper way of managing those hundreds of containers pushed for a solution

### What features do orechstration tools offer?
- High availability
    - No down time
- Scalability
    - High performance, high response rate
- Disaster Recovery
    - Backup and restore
    - So applications don't lose any data

## K8 Components
- Node and Pod
    - Node is a simple server (physical or virtual)
- Pod
    - Smallest unit of K8's
    - Abstrationk over container
    - Usually 1 application per Pod
    - Each Pod gets its own IP address and can communicate with each other
        - Pods communicate with each other through a service
- Kubernetes offers viritual network out of the box
    - Each pod gets its own IP address
    - Pod can die very easily so it will give it a new IP address on re-creation
## Service and Ingress
- Service is a permanent IP address that can be assigned to each Pod
    - Lifecycle of Pod and Service are not connected
    - You have to expose the network, but you don't want to expose it to everybody so you can create an internal service
    - Theres external and internal service
- You can change the url to an actual name rather than just IP address
- Ingress forwards the name to the service
- Service is also a load balancer

## ConfigMap and Secret
- Configure db url through ConfigMap
    - Database URL are usually in the built application where you have to rebuild the application wiht the new version, push it to the repo, and have to pull new image in pod then restart whole thing... It's a little tedious
    - This is what Kubernetes has to solve this issue
    - External configuration of your application and you connect it to your pod
    - You just adjust the config map if you make a change
- Don't put creds into ConfigMap
    - Kubernets has Secret tool
    - Just like ConfigMap but used to store secret data
    - base64 encoded rather than simple text
    - The built-in security mechanism is not enabled by default
    - Have to connect it to the pod
- Without Volumes, the data in the DB will be lost when you restart
    - You want data to persist regardless of the db running or not
    - Attaches a phyiscal storage on the hard drive to the POD
        - Coudl be on local maachine or remote, outside of the K8's cluster
    - Important to konw difference between K8's cluster vs storage
        - Storage is something plugged into K8's clusters
    - K8's donesn't manage data persistance

## Deployment and Stateful Set
- Service has a load balancer built into it, so it catches the request and then sends it to whichever node/pod that has the least amount of activity
- To recreate a second pod, you would define a blueprint for pods and define how many replica you would like to run in deployment
- You will work with deployment mostly and not with pods
- You can replicate DB with deployment because it has state (data
    - It would need to access the same data storage if we had multiple DB pods
    - This avoids data inconsistency
- Stateful Set
    - Meant for applications like DB's
    - Deployment for stateLESS Apps
    - StatefulSet for stateFUL Apps or Databases
    - This will take care of replicating the DB's
    - Not easy to deploy DB using this which is why DB's are often hosted outside of K8's clusters

## Kubernetes Architecture
- Node process: Worker machine
    - Worker nodes do the actual work
    - 3 processes must be installed on every node
        - container runtime
        - Kubelet
            - The process that actually does it is Kubelet: interacts with both the container and ndoe. Starts the pod with a container inside
            - Communication via Services
        - Kube proxy
            - forwards the request
- How to interact with cluster?
    - Managing processes are done by master nodes
    - Two types of nodes:
        - Master/Control nodes
            - Master processes: 4 processes that run on every master node
                - API server: like a cluster gate. Gets the inintial request/query and acts as a gate keeper for authentication
                    - Flow: some request -> API Server -> validates request -> other processes... -> Pod
                    - Load balancer
                - Scheduler
                    - Schedule new Pod -> API Server -> Scheduler -> Where to put the Pod? -> Kubelet
                    - Scheduler will just decides on which node a new Pod will be scheduled
                        - The process the does it Kubelet
                - Controller Manager:
                    - Crucial component because it will detect when nodes die and reschedule it as soon as possible
                    - Detects cluster state changes
                    - Controller Manager -> Scheduler -> Kubelet
                - ETCD
                    - Key valued store for a cluster state
                    - Cluster brain
                    - Cluster changes get stored in the key value store
                        - Application data is not stored in etcd
                - Typically needs less resources such as CPU | RAM | Storage
        - Slave/Worker nodes:
            - Needs more resources 

## Minikube & Kubectl
- Minikube
    - One node cluster where Master and Node processes run on one machine
    - Can have docker pre-installed
    - Runs through a virtual box/hyper-visor
        - Creates Virtual box
        - Node runs in that Virtual Box
        - 1 Node K8's cluster
        - For testing
- Kubectl
    - Interacts with clusters, Pod, Kubernetes components 
        - Creating things on that Node
    - Command line tool for Kubernetes clusters
    - API server is the main entry point into the cluster
        - Enables interaction with cluster
        - 3 different types of clients
            - UI
            - API
            - CLI: most powerful of the 3 clients
    - Enable Pods to run on node
        - Create pods/services
        - Destroy pods
    - Isn't just for Minikube clusters, could also use on Cloud clusters
    
## Ingress
- Port forwarding (external) to internal service

## Ingress Controller
- Evaluates all the rules
- Manages redirections
- Entrypoint to cluster
- Many third-party implementation
    - Kubernetes has an internal one called K8s Nginx Ingress Controller
- Have separate server for Proxy Server to hit the ingress controller externally. Everything else will not be open externally

## Services
- Each Pod has its own IP address, but Pods are ephemeral
    - Ephemeral means that are destroyed frequently
    - Each time its destroyed, Pods get new IP address and we need to adjust the IP address everytime if we use the Pod IP
    - Instead of using that, we use Services which is a solution to a stable IP address
        - It is infront of the Pod
- Services provides load balancing
    - Clients can call a single IP address to access different pods instead of individually accessing different IP addresses
- 4 different types of services
    1. ClusterIP Services
        - Most common because its the default
    2. Headless Services
    3. NodePort Services
    4. LoadBalancer Services