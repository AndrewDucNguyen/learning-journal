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
        - Master nodes
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
    
## Structured Learning:

### Phase 1 - Build mental model
- Nana's 15-minute Kubernetes video
    - Goal: Understand these words without taking notes. Just understand vocabulary:
        ```
            Cluster
            Node
            Pod
            Deployment
            Service
            Ingress
        ```
- DevOps Directive https://www.youtube.com/watch?v=2T86xAtR6Fo
        - Goal: Understand these words without taking notes. Just understand vocabulary:
        ```
            Docker runs containers
            Kubernetes runs Pods
            Deployments manage Pods
            Services expose Pods
            Ingress exposes Services
        ```
### Phase 2 - Learn the objects I'll use
- Use Nana's playlist, but don't watch everything
    - Focus on:
        * Pods
        * Deployments
        * Services
        * Namespaces
        * ConfigMaps
        * Secrets
        * Ingress

### Phase 3 - Install K3s
- https://www.youtube.com/watch?v=2T86xAtR6Fo
- Age matters more with these
- Focus On:
    - Install K3s
    - Get kubectl working
    - View nodes
    - View pods

### Phase 4 - Deploy the current UI

### Phase 5 - Learn Helm
- https://www.youtube.com/watch?v=s_o8dwzRlu4
- Learn helm create myapp
- Look at:
    - values.yaml
    - templates/deployment.yaml
    - templates/service.yaml

### Phase 6 - Convert nginx to your frontend


### Phase 7 - Understand production patterns


Okay help me structure everything of how to go about learning this so I have a good understanding and able to do it myself. The videos I'm looking at:
- The 15min tutorial by Nana
- The playlist by Nana
- https://www.youtube.com/watch?v=2T86xAtR6Fo&t=3095s
- https://www.youtube.com/watch?v=X48VuDVv0do&pp=ygUTa3ViZXJuZXRlcyB0dXRvcmlhbA%3D%3D
- https://www.youtube.com/watch?v=s_o8dwzRlu4&t=104s&pp=ygUTa3ViZXJuZXRlcyB0dXRvcmlhbA%3D%3D