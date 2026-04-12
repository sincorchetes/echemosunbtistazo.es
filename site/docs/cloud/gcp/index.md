---
id: index
uuid: 7b3c1a2e-9f4d-4e8a-b5c6-d7e8f9a0b1c2
title: "Google Cloud Platform"
sidebar_position: 1
sidebar_label: "GCP"
---

# Login

## Usuario personal, corporativo:
```
gcloud auth login
```

## Cuenta de servicio (JSON)
```
gcloud auth activate-service-account --key-file=ruta_service_account.json
```

# Proyecto

## Establecer proyecto
```
gcloud config set project nombre_proyecto
```

## Listar proyectos
```
gcloud projects list
```

# Bindings: SA GCP - SA K8S

## Obtener binding
```
gcloud iam service-accounts get-iam-policy GCP_SA_NAME@GCP_ID_PROJECT.iam.gserviceaccount.com
bindings:
- members:
  - serviceAccount:GCP_ID_PROJECT.svc.id.goog[K8S_NAMESPACE/K8S_SA]
  role: roles/iam.workloadIdentityUser
etag: BwZPF_vogWQ=
version: 1
```

## Crear binding 
```
gcloud iam service-accounts add-iam-policy-binding \
    GCP_SA_NAME@GCP_ID_PROJECT.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:GCP_ID_PROJECT.svc.id.goog[K8S_NAMESPACE/K8S_SA]" \
    --project GCP_ID_PROJECT
```

## Eliminar binding 
```
gcloud iam service-accounts remove-iam-policy-binding \
    GCP_SA_NAME@GCP_ID_PROJECT.iam.gserviceaccount.com \
    --role=roles/iam.workloadIdentityUser \
    --member="serviceAccount:GCP_ID_PROJECT.svc.id.goog[K8S_NAMESPACE/K8_SA]" \
    --project GCP_ID_PROJECT
```

## Listar bindings
```
❯ gcloud iam service-accounts list --project GCP_ID_PROJECT
```