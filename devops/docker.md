# Docker Course

## Motivation for Containers
- Development: "run docker compose up"
- Deployment: "Run this container image with these options"

## What is a container?
- A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application

### Container vs Container Image
- Container image: Artiffact that has all the dependency components in it
- Container: Run the image
- A container image is like a class in object-oriented programming, while a container is an instantiation of that class. A container allows us to create one or more standardized copies that are the same every time.

### Open Container Initiative
- The Open Container Initiative is an open governance structure for the express purpose of creating open industry standards around container formats and runtimes
- 3 specific specification
    1. Runtime Specification: How to take image that runs to image specification
    2. Image Specification: Defines what should be included in the image (meta data and file format)
    3. Distribution Specification: How an image should be distributed
- Container types:
    - Desktop Container Platforms
    - Container Runtimes

## Technology Overview
- 3 technologies that make up the core of a container
    1. Namespaces
        - Mechanism to wrap a global system resource
        - Namespaces = isolation
    2. Control Groups (cgroups)
        - cgroups = CPU/memory limits
    3. Union Filesystems
        - Union filesystem = image layers