IMAGE := diegotony/fee-micro:k8s
# IMAGE := diegotony/client-micro:k8s

test:
	true

image:
	docker build -t $(IMAGE) . --no-cache

push-image:
	docker push $(IMAGE)


.PHONY: image push-image test

