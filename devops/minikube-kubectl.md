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
- 