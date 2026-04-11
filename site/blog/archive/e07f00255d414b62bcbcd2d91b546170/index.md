---
uuid: e07f00255d414b62bcbcd2d91b546170
title: "Actualizando Zabbix 5.0 LTS a 6.0 LTS en Rocky Linux"
slug: /posts/actualizando-zabbix-50-lts-60-lts-rocky-linux
date: 2022-02-24
authors:
  - sincorchetes
tags:
  - Sistemas
  - Linux
---
Zabbix es un software de monitorización que permite monitorizar la red, servidores, entornos cloud, aplicaciones que puede ejecutarse en entornos on premise y en entornos cloud. Tiene como características escalabilidad ilimitada, monitorización distribuída, alta disponibilidad, es flexible y segura.

<!-- truncate -->

Es fácil de implementar y posee compatibilidad con MariaDB y PostgreSQL como sistema de gestión y tratamiento de datos. Es un proyecto open source bastante atractivo y con alta actividad tanto en IRC (Libera.chat) como en sus foros.

En este tutorial veremos cómo hacer la actualización con el siguiente esquema de servidor:

## Puesta en marcha
Pre:

  * RockyLinux 8.5
  * MariaDB 10.3
  * Zabbix 5.0 LTS
  * NGINX

Post:

  * RockyLinux 8.5
  * MariaDB 10.5
  * Zabbix 6.0 LTS
  * NGINX

> **NOTA**: Si podemos hacer snapshot del servidor, apagamos el servidor, lo hacemos e iniciamos el sistema.

1. Deshabilitamos todos los User media tales como integraciones con Slack, Telegram, Email... para evitar avisos

2. Apagamos los siguientes servicios:
```
sudo systemctl stop nginx.service
sudo systemctl stop zabbix-server.service
sudo systemctl stop zabbix-proxy.service # En caso de que tuvieras
sudo systemctl stop zabbix-agent.service 
sudo systemctl stop zabbix-agent2.service # Depende cuál uses
```

3. Hacemos un backup de la base de datos y de otras configuraciones esenciales de Zabbix.
```
sudo mkdir /opt/zabbix-backup/
mysqldump -u root zabbix > dump.sql
sudo mv dump.sql /opt/zabbix-backup/dump.sql
sudo cp /etc/zabbix/zabbix_server.conf /opt/zabbix-backup/
sudo cp /etc/nginx/conf.d/zabbix.conf  /opt/zabbix-backup/
sudo cp -R /usr/share/zabbix/ /opt/zabbix-backup/
sudo cp -R /usr/share/doc/zabbix-* /opt/zabbix-backup/
```

4. Apagamos la base de datos
```
sudo systemctl stop mariadb.service
```

5. Instalamos el nuevo repositorio
```
sudo rpm -Uvh https://repo.zabbix.com/zabbix/6.0/rhel/8/x86_64/zabbix-release-6.0-1.el8.noarch.rpm
```

6. Actualizamos los paquetes
```
sudo dnf upgrade zabbix-server-mysql zabbix-web-mysql zabbix-agent zabbix-nginx-conf
```

7. Comprobamos las configuraciones que tengamos en `/etc/nginx/conf.d/` y aplicamos los cambios convenientes (_Mejor que se respete la nueva y los cambios que se introduzcan sean los de los certificados por ejemplo_)

8. Eliminamos la versión anterior de MariaDB
> **NOTA**: Si no, no podrás instalarla porque da conflictos. Los archivos quedan guardados en `/var/lib/mysql` no se eliminan.

```
sudo dnf remove mariadb-server
```

9. Desactivamos la rama 10.3 y activamos 10.5
```
sudo dnf -y module disable mariadb:10.3
sudo dnf -y module enable mariadb:10.5
```

10. Instalamos la nueva versión
```
sudo dnf install mariadb-server
```

> **NOTA**: Verás que es la 10.5 y no 10.3, si es así, mejor que vuelvas al paso anterior.

11. Arrancamos el servidor
```
sudo systemctl enable --now mariadb.service
```

12. Ejecutamos el upgrade:
```
sudo mysql_upgrade -u root -p
```
> **NOTA**: ¿Por qué ejecutarlo con sudo? Porque si no, no podrá crear el archivo de información resultante: `/var/lib/mysql/mysql_upgrade_info`.

Veremos una salida como esta:
```
Phase 1/7: Checking and upgrading mysql database
Processing databases
mysql
mysql.column_stats                                 OK
mysql.columns_priv                                 OK
mysql.db                                           OK
mysql.event                                        OK
mysql.func                                         OK
mysql.gtid_slave_pos                               OK
mysql.help_category                                OK
mysql.help_keyword                                 OK
mysql.help_relation                                OK
mysql.help_topic                                   OK
mysql.host                                         OK
mysql.index_stats                                  OK
mysql.innodb_index_stats                           OK
mysql.innodb_table_stats                           OK
mysql.plugin                                       OK
mysql.proc                                         OK
mysql.procs_priv                                   OK
mysql.proxies_priv                                 OK
mysql.roles_mapping                                OK
mysql.servers                                      OK
mysql.table_stats                                  OK
mysql.tables_priv                                  OK
mysql.time_zone                                    OK
mysql.time_zone_leap_second                        OK
mysql.time_zone_name                               OK
mysql.time_zone_transition                         OK
mysql.time_zone_transition_type                    OK
mysql.transaction_registry                         OK
mysql.user                                         OK
Phase 2/7: Installing used storage engines... Skipped
Phase 3/7: Fixing views
Phase 4/7: Running 'mysql_fix_privilege_tables'
Phase 5/7: Fixing table and database names
Phase 6/7: Checking and upgrading tables
Processing databases
information_schema
performance_schema
zabbix
zabbix.acknowledges                                OK
zabbix.actions                                     OK
zabbix.alerts                                      OK
zabbix.application_discovery                       OK
zabbix.application_prototype                       OK
zabbix.application_template                        OK
zabbix.applications                                OK
zabbix.auditlog                                    OK
zabbix.auditlog_details                            OK
zabbix.autoreg_host                                OK
zabbix.conditions                                  OK
zabbix.config                                      OK
zabbix.config_autoreg_tls                          OK
zabbix.corr_condition                              OK
zabbix.corr_condition_group                        OK
zabbix.corr_condition_tag                          OK
zabbix.corr_condition_tagpair                      OK
zabbix.corr_condition_tagvalue                     OK
zabbix.corr_operation                              OK
zabbix.correlation                                 OK
zabbix.dashboard                                   OK
zabbix.dashboard_user                              OK
zabbix.dashboard_usrgrp                            OK
zabbix.dbversion                                   OK
zabbix.dchecks                                     OK
zabbix.dhosts                                      OK
zabbix.drules                                      OK
zabbix.dservices                                   OK
zabbix.escalations                                 OK
zabbix.event_recovery                              OK
zabbix.event_suppress                              OK
zabbix.event_tag                                   OK
zabbix.events                                      OK
zabbix.expressions                                 OK
zabbix.functions                                   OK
zabbix.globalmacro                                 OK
zabbix.globalvars                                  OK
zabbix.graph_discovery                             OK
zabbix.graph_theme                                 OK
zabbix.graphs                                      OK
zabbix.graphs_items                                OK
zabbix.group_discovery                             OK
zabbix.group_prototype                             OK
zabbix.history                                     OK
zabbix.history_log                                 OK
zabbix.history_str                                 OK
zabbix.history_text                                OK
zabbix.history_uint                                OK
zabbix.host_discovery                              OK
zabbix.host_inventory                              OK
zabbix.host_tag                                    OK
zabbix.hostmacro                                   OK
zabbix.hosts                                       OK
zabbix.hosts_groups                                OK
zabbix.hosts_templates                             OK
zabbix.housekeeper                                 OK
zabbix.hstgrp                                      OK
zabbix.httpstep                                    OK
zabbix.httpstep_field                              OK
zabbix.httpstepitem                                OK
zabbix.httptest                                    OK
zabbix.httptest_field                              OK
zabbix.httptestitem                                OK
zabbix.icon_map                                    OK
zabbix.icon_mapping                                OK
zabbix.ids                                         OK
zabbix.images                                      OK
zabbix.interface                                   OK
zabbix.interface_discovery                         OK
zabbix.interface_snmp                              OK
zabbix.item_application_prototype                  OK
zabbix.item_condition                              OK
zabbix.item_discovery                              OK
zabbix.item_preproc                                OK
zabbix.item_rtdata                                 OK
zabbix.items                                       OK
zabbix.items_applications                          OK
zabbix.lld_macro_path                              OK
zabbix.lld_override                                OK
zabbix.lld_override_condition                      OK
zabbix.lld_override_opdiscover                     OK
zabbix.lld_override_operation                      OK
zabbix.lld_override_ophistory                      OK
zabbix.lld_override_opinventory                    OK
zabbix.lld_override_opperiod                       OK
zabbix.lld_override_opseverity                     OK
zabbix.lld_override_opstatus                       OK
zabbix.lld_override_optag                          OK
zabbix.lld_override_optemplate                     OK
zabbix.lld_override_optrends                       OK
zabbix.maintenance_tag                             OK
zabbix.maintenances                                OK
zabbix.maintenances_groups                         OK
zabbix.maintenances_hosts                          OK
zabbix.maintenances_windows                        OK
zabbix.mappings                                    OK
zabbix.media                                       OK
zabbix.media_type                                  OK
zabbix.media_type_message                          OK
zabbix.media_type_param                            OK
zabbix.module                                      OK
zabbix.opcommand                                   OK
zabbix.opcommand_grp                               OK
zabbix.opcommand_hst                               OK
zabbix.opconditions                                OK
zabbix.operations                                  OK
zabbix.opgroup                                     OK
zabbix.opinventory                                 OK
zabbix.opmessage                                   OK
zabbix.opmessage_grp                               OK
zabbix.opmessage_usr                               OK
zabbix.optemplate                                  OK
zabbix.problem                                     OK
zabbix.problem_tag                                 OK
zabbix.profiles                                    OK
zabbix.proxy_autoreg_host                          OK
zabbix.proxy_dhistory                              OK
zabbix.proxy_history                               OK
zabbix.regexps                                     OK
zabbix.rights                                      OK
zabbix.screen_user                                 OK
zabbix.screen_usrgrp                               OK
zabbix.screens                                     OK
zabbix.screens_items                               OK
zabbix.scripts                                     OK
zabbix.service_alarms                              OK
zabbix.services                                    OK
zabbix.services_links                              OK
zabbix.services_times                              OK
zabbix.sessions                                    OK
zabbix.slides                                      OK
zabbix.slideshow_user                              OK
zabbix.slideshow_usrgrp                            OK
zabbix.slideshows                                  OK
zabbix.sysmap_element_trigger                      OK
zabbix.sysmap_element_url                          OK
zabbix.sysmap_shape                                OK
zabbix.sysmap_url                                  OK
zabbix.sysmap_user                                 OK
zabbix.sysmap_usrgrp                               OK
zabbix.sysmaps                                     OK
zabbix.sysmaps_elements                            OK
zabbix.sysmaps_link_triggers                       OK
zabbix.sysmaps_links                               OK
zabbix.tag_filter                                  OK
zabbix.task                                        OK
zabbix.task_acknowledge                            OK
zabbix.task_check_now                              OK
zabbix.task_close_problem                          OK
zabbix.task_data                                   OK
zabbix.task_remote_command                         OK
zabbix.task_remote_command_result                  OK
zabbix.task_result                                 OK
zabbix.timeperiods                                 OK
zabbix.trends                                      OK
zabbix.trends_uint                                 OK
zabbix.trigger_depends                             OK
zabbix.trigger_discovery                           OK
zabbix.trigger_tag                                 OK
zabbix.triggers                                    OK
zabbix.users                                       OK
zabbix.users_groups                                OK
zabbix.usrgrp                                      OK
zabbix.valuemaps                                   OK
zabbix.widget                                      OK
zabbix.widget_field                                OK
Phase 7/7: Running 'FLUSH PRIVILEGES'
OK
```

13. Iniciamos los servicios
```
sudo systemctl start zabbix-server.service
sudo systemctl start zabbix-proxy.service # En caso de que tuvieras
sudo systemctl start zabbix-agent.service 
sudo systemctl start zabbix-agent2.service # Depende cuál uses
sudo systemctl start nginx.service
```

14. Ya deberías poder acceder al portal de login.

## Recursos
  * Documentación oficial: [Zabbix](https://www.zabbix.com/documentation/current/en/manual/installation/upgrade/packages/rhel_centos)
