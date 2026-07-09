# MiniKube and Kubectl

## MiniKube
- Tool for running a local Kubernetes cluster
    - Primarily for development and learning
- 1 Node cluster where master/control processes and worker processes work/run on 1 machine
- Has Docker runtime pre-installed
- Ran through a virtual box / hypervisor
    - The Node runs in that Virtual Box
- Minikube has Kubectl as a dependency

## Kubectl
- How you interact with MiniKube
- Command line interface/tool for k8 clusters
- Enable pods to run on node
    - Create/Destroy pods
    - Create services
- Isn't just for minikube, but works for any type of kubernetes cluster

## Basic Kubectl Commands
- Create and debug Pods in a minikube cluster

### CRUD commands
- Create deployment             `kubectl create deployment [name]`
    - Deployment is an abstraction layer over Pods. You don't create pods directly, you create deployment with pods underneath it
    - `kubectl create deployment nginx-depl --image=nginx` - This creates a deployment with a pod called nginx with the nginx image
        - This is the blueprint for creating pods
        - Most basic configuration for deployment
    - Another layer thats managed by Kubernetes is called `replicaset`
    - Layers of Abstraction:
        - Deployment
        - ReplicaSet
        - Pod
        - Container
    - Everythign below Deployment is handled by Kubernetes
    - Each abstraction is managed by the layer above it
- Edit deployment               `kubectl edit deployment [name]`
    - You will get an aut-generated configuration file with default values
- Delete deployment             `kubectl delete deployment [name]`

### Status of different K8's components
`kubectl get nodes | pod | services | replicaset | deployment`

### Debugging pods
- Log to console:               `kubectl logs [pod name]`
- Get interactive Terminal      `kubectl exec -it [pod name] -- bin/bash`
- Get info about pod            `kubectl describe pod [pod name]`
- To check what is going on in the pod you use `exec`
    - Gets the terminal of that application
    - `kubectl exec -it [pod name] -- bin/bash`
- Applies a config file with    `kubectl apply -f [file name]`
    - Executes whatever is in that file
    - Whenever you make changes, you have to reapply it to the cluster
    - K8s knows when to create or update deployment
    - Creates/Updates K8 components
- Delete config file            `kubectl delete -f [file name]`