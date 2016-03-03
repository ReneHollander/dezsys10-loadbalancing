# dezsys10-loadbalancing

## Vorraussetzungen
- NodeJS v5.7.0
- gcc, make

## Installing
Run `npm install` to download the needed dependencies.  
If the native addon cannot be built, run `npm install --ignore-scripts`

## Running
Start a loadbalancer with:
```
# Without logging
node loadbalancer.js --balancerport 5001 --webport 5000 --algorithm wdistrib

# With logging
DEBUG=loadbalancer node loadbalancer.js --balancerport 5001 --webport 5000 --algorithm wdistrib
```
Start a service with:
```
# Without logging
node service.js --hostname localhost --port 5001 --name service1 --weight 3

# With logging
DEBUG=service node service.js --hostname localhost --port 5001 --name service1 --weight 3
```
