---
uuid: 51961a0bf54b42868443059fda2d35a1
title: "Mastering Squid - ACL"
slug: /posts/mastering-squid-paso-2-acl
date: 2021-01-07
authors:
  - sincorchetes
tags:
  - Linux
---
Bienvenid@s a la segunda parte de este "_Mastering in Squid_", en esta parte del curso, os explicaremos qué son las listas de control de acceso una parte de las directivas de Squid, para qué se utilizan y cómo utilizarlas, no nos lo podemos perder.

<!-- truncate -->

# ¿Qué son las ACL?

Las ACL (_Access Control List_) o en español _Listas de Control de Acceso_ es un concepto de seguridad informática que utiliza para fomentar la separación de privilegios, en nuestro caso, ayudará a separar url, ips o nombres de máquinas para posteriormente hacer algo con ellas, como por ejemplo, en un instituo, permitir el acceso a redes sociales a los profesores, pero no a los ordenadores de los alumnos...

# ¿Cómo definimos las ACL?
Existen dos tipos de sintaxis, en línea o apuntando a un archivo.
 * En línea: Es más cómodo cuando apuntamos 2,3 datos, más se puede volver ilegible y engorroso.

 	acl nombre_de_lista tipo_acl dato1 dato2 dato3
 * Apuntando a un archivo: Se utiliza cuando apuntamos más de 3 datos, se permiten comentarios.

 	acl nomnre_de_lista tipo_acl "/DIRECTORIO/ARCHIVO"

# ¿Qué tipos de ACL tenemos?
Tenemos multitud de ellos como:

 * `arp [DIRECCION_MAC]`: Crea una ACL con una o varias dirección(es) MAC.
   * _Notas:
    * No funciona con todos los sistemas operativos, según la documentación trabaja correctamente con Linux, Solaris, Windows, FreeBSD y otras variantes de BSD.
    * Squid solo puede determinar la dirección MAC/EUI para clientes IPv4 que se encuentren en la misma subred, si están en otras subredes Squid no puede reconocer qué equipo es.
    * El protocolo IPv6 no contiene ARP, se utiliza ND (Neighbor Discovery) que es parecido, con lo que esta directiva no funciona para IPv6._
  * clientside mark[/mask]
        -Esta aplicación hay que investigarla
  * `srcdomain .google.es`: Permite definir un dominio o dirección IP/direcciones origen
  * `dstdomain dirección_destino`: Puede ser una url, ip o conjunto de direcciones ips.
  * `srcdom_regex \.google\.* `: Igual que srdomain pero con la opción de usar expresiones regulares.
  * `dstdom_regex \.google\.* `: Especifica dirección destino haciendo uso de expresiones regulares.
    - src_as number
    - dst_as number
  * `time [DIA DE LA SEMANA] [HORA1]-[HORA2]`: Establece un periodo de conexión:
    * Se define la semana como:
    	* M -> Lunes
        * T -> Martes
        * W -> Miércoles
        * H -> Jueves
        * F -> Viernes
        * A -> Sábado
    * Se define la HORA1 y HORA2 como: hh:mm
  * `url_regex ^http://`: Permite bloquear urls haciendo uso de expresiones regulares.
  * `urllogin [^a-zA-Z0-9]`: Busca una expresión regular que coincida con un campo login
  * `urlpath_regex \.exe(\?.*)?$`: Encuentra un directorio y permite filtrar contenido
  * `port 80 70 120`: Permite definir un puerto o varios, se permiten rangos destino TCP
  * `localport 3128`: Puerto de cliente TCP conectado a
  * `myportname 3128`: Refleja si los detalles de conexión TCP equivalen al puerto declarado en el fichero de configuración de Squid.
  * `proto HTTP FTP...`: Se pueden bloquear protocolos como FTP para que no se pueda acceder.
  * `method GET PUT POST`: Especifica si se puede utilizar o no los métodos de solicitud del protocolo HTTP.
  * `http_status 404 200`: Especifica el código de respuesta del servidor
  * `browser Mozilla`: Especifica el navegador al que bloquear o no, se identifica mediante el UserAgent.
  * `referer_regex regexp`: Permite encontrar un patrón relacionado con la expresión regular que definimos, es muy difícil de aplicar, por lo que hay que tener cuidado.
  * `ident cadena`: Busca una cadena
  * `ident_regex patrón`: Busca una cadena relacionada con lo declarado.
  * `acl aclname proxy_auth [-i] username`: ...
	acl aclname proxy_auth_regex [-i] pattern ...
	  # perform http authentication challenge to the client and match against
	  # supplied credentials [slow]
	  #
	  # takes a list of allowed usernames.
	  # use REQUIRED to accept any valid username.
	  #
	  # Will use proxy authentication in forward-proxy scenarios, and plain
	  # http authenticaiton in reverse-proxy scenarios
	  #
	  # NOTE: when a Proxy-Authentication header is sent but it is not
	  # needed during ACL checking the username is NOT logged
	  # in access.log.
	  #
	  # NOTE: proxy_auth requires a EXTERNAL authentication program
	  # to check username/password combinations (see
	  # auth_param directive).
	  #
	  # NOTE: proxy_auth can't be used in a transparent/intercepting proxy
	  # as the browser needs to be configured for using a proxy in order
	  # to respond to proxy authentication.

	acl aclname snmp_community string ...
	  # A community string to limit access to your SNMP Agent [fast]
	  # Example:
	  #
	  #	acl snmppublic snmp_community public

	acl aclname maxconn number
	  # This will be matched when the client's IP address has
	  # more than <number> TCP connections established. [fast]
	  # NOTE: This only measures direct TCP links so X-Forwarded-For
	  # indirect clients are not counted.

	acl aclname max_user_ip [-s] number
	  # This will be matched when the user attempts to log in from more
	  # than <number> different ip addresses. The authenticate_ip_ttl
	  # parameter controls the timeout on the ip entries. [fast]
	  # If -s is specified the limit is strict, denying browsing
	  # from any further IP addresses until the ttl has expired. Without
	  # -s Squid will just annoy the user by "randomly" denying requests.
	  # (the counter is reset each time the limit is reached and a
	  # request is denied)
	  # NOTE: in acceleration mode or where there is mesh of child proxies,
	  # clients may appear to come from multiple addresses if they are
	  # going through proxy farms, so a limit of 1 may cause user problems.

	acl aclname random probability
	  # Pseudo-randomly match requests. Based on the probability given.
	  # Probability may be written as a decimal (0.333), fraction (1/3)
	  # or ratio of matches:non-matches (3:5).

	acl aclname req_mime_type [-i] mime-type ...
	  # regex match against the mime type of the request generated
	  # by the client. Can be used to detect file upload or some
	  # types HTTP tunneling requests [fast]
	  # NOTE: This does NOT match the reply. You cannot use this
	  # to match the returned file type.

	acl aclname req_header header-name [-i] any\.regex\.here
	  # regex match against any of the known request headers.  May be
	  # thought of as a superset of "browser", "referer" and "mime-type"
	  # ACL [fast]

	acl aclname rep_mime_type [-i] mime-type ...
	  # regex match against the mime type of the reply received by
	  # squid. Can be used to detect file download or some
	  # types HTTP tunneling requests. [fast]
	  # NOTE: This has no effect in http_access rules. It only has
	  # effect in rules that affect the reply data stream such as
	  # http_reply_access.

	acl aclname rep_header header-name [-i] any\.regex\.here
	  # regex match against any of the known reply headers. May be
	  # thought of as a superset of "browser", "referer" and "mime-type"
	  # ACLs [fast]

	acl aclname external class_name [arguments...]
	  # external ACL lookup via a helper class defined by the
	  # external_acl_type directive [slow]

	acl aclname user_cert attribute values...
	  # match against attributes in a user SSL certificate
	  # attribute is one of DN/C/O/CN/L/ST or a numerical OID [fast]

	acl aclname ca_cert attribute values...
	  # match against attributes a users issuing CA SSL certificate
	  # attribute is one of DN/C/O/CN/L/ST or a numerical OID  [fast]

	acl aclname ext_user username ...
	acl aclname ext_user_regex [-i] pattern ...
	  # string match on username returned by external acl helper [slow]
	  # use REQUIRED to accept any non-null user name.

	acl aclname tag tagvalue ...
	  # string match on tag returned by external acl helper [fast]
	  # DEPRECATED. Only the first tag will match with this ACL.
	  # Use the 'note' ACL instead for handling multiple tag values.

	acl aclname hier_code codename ...
	  # string match against squid hierarchy code(s); [fast]
	  #  e.g., DIRECT, PARENT_HIT, NONE, etc.
	  #
	  # NOTE: This has no effect in http_access rules. It only has
	  # effect in rules that affect the reply data stream such as
	  # http_reply_access.

	acl aclname note [-m[=delimiters]] name [value ...]
	  # match transaction annotation [fast]
	  # Without values, matches any annotation with a given name.
	  # With value(s), matches any annotation with a given name that
	  # also has one of the given values.
	  # If the -m flag is used, then the value of the named
	  # annotation is interpreted as a list of tokens, and the ACL
	  # matches individual name=token pairs rather than whole
	  # name=value pairs. See "ACL Options" above for more info.
	  # Annotation sources include note and adaptation_meta directives
	  # as well as helper and eCAP responses.

	acl aclname adaptation_service service ...
	  # Matches the name of any icap_service, ecap_service,
	  # adaptation_service_set, or adaptation_service_chain that Squid
	  # has used (or attempted to use) for the master transaction.
	  # This ACL must be defined after the corresponding adaptation
	  # service is named in squid.conf. This ACL is usable with
	  # adaptation_meta because it starts matching immediately after
	  # the service has been selected for adaptation.

	acl aclname transaction_initiator initiator ...
	  # Matches transaction's initiator [fast]
	  #
	  # Supported initiators are:
	  #  esi: matches transactions fetching ESI resources
	  #  certificate-fetching: matches transactions fetching
	  #     a missing intermediate TLS certificate
	  #  cache-digest: matches transactions fetching Cache Digests
	  #     from a cache_peer
	  #  htcp: matches HTCP requests from peers
	  #  icp: matches ICP requests to peers
	  #  icmp: matches ICMP RTT database (NetDB) requests to peers
	  #  asn: matches asns db requests
	  #  internal: matches any of the above
	  #  client: matches transactions containing an HTTP or FTP
	  #     client request received at a Squid *_port
	  #  all: matches any transaction, including internal transactions
	  #     without a configurable initiator and hopefully rare
	  #     transactions without a known-to-Squid initiator
	  #
	  # Multiple initiators are ORed.

	acl aclname has component
	  # matches a transaction "component" [fast]
	  #
	  # Supported transaction components are:
	  #  request: transaction has a request header (at least)
	  #  response: transaction has a response header (at least)
	  #  ALE: transaction has an internally-generated Access Log Entry
	  #       structure; bugs notwithstanding, all transaction have it
	  #
	  # For example, the following configuration helps when dealing with HTTP
	  # clients that close connections without sending a request header:
	  #
	  #  acl hasRequest has request
	  #  acl logMe note important_transaction
	  #  # avoid "logMe ACL is used in context without an HTTP request" warnings
	  #  access_log ... logformat=detailed hasRequest logMe
	  #  # log request-less transactions, instead of ignoring them
	  #  access_log ... logformat=brief !hasRequest
	  #
	  # Multiple components are not supported for one "acl" rule, but
	  # can be specified (and are ORed) using multiple same-name rules:
	  #
	  #  # OK, this strange logging daemon needs request or response,
	  #  # but can work without either a request or a response:
	  #  acl hasWhatMyLoggingDaemonNeeds has request
	  #  acl hasWhatMyLoggingDaemonNeeds has response

IF USE_OPENSSL
	acl aclname ssl_error errorname
	  # match against SSL certificate validation error [fast]
	  #
	  # For valid error names see in /usr/local/squid/share/errors/templates/error-details.txt
	  # template file.
	  #
	  # The following can be used as shortcuts for certificate properties:
	  #  [ssl::]certHasExpired: the "not after" field is in the past
	  #  [ssl::]certNotYetValid: the "not before" field is in the future
	  #  [ssl::]certUntrusted: The certificate issuer is not to be trusted.
	  #  [ssl::]certSelfSigned: The certificate is self signed.
	  #  [ssl::]certDomainMismatch: The certificate CN domain does not
	  #         match the name the name of the host we are connecting to.
	  #
	  # The ssl::certHasExpired, ssl::certNotYetValid, ssl::certDomainMismatch,
	  # ssl::certUntrusted, and ssl::certSelfSigned can also be used as
	  # predefined ACLs, just like the 'all' ACL.
	  #
	  # NOTE: The ssl_error ACL is only supported with sslproxy_cert_error,
	  # sslproxy_cert_sign, and sslproxy_cert_adapt options.

	acl aclname server_cert_fingerprint [-sha1] fingerprint
	  # match against server SSL certificate fingerprint [fast]
	  #
	  # The fingerprint is the digest of the DER encoded version 
	  # of the whole certificate. The user should use the form: XX:XX:...
	  # Optional argument specifies the digest algorithm to use.
	  # The SHA1 digest algorithm is the default and is currently
	  # the only algorithm supported (-sha1).
	
	acl aclname at_step step
	  # match against the current step during ssl_bump evaluation [fast]
	  # Never matches and should not be used outside the ssl_bump context.
	  #
	  # At each SslBump step, Squid evaluates ssl_bump directives to find
	  # the next bumping action (e.g., peek or splice). Valid SslBump step
	  # values and the corresponding ssl_bump evaluation moments are:
	  #   SslBump1: After getting TCP-level and HTTP CONNECT info.
	  #   SslBump2: After getting SSL Client Hello info.
	  #   SslBump3: After getting SSL Server Hello info.
	
	acl aclname ssl::server_name [option] .foo.com ...
	  # matches server name obtained from various sources [fast]
	  #
	  # The ACL computes server name(s) using such information sources as
	  # CONNECT request URI, TLS client SNI, and TLS server certificate 
	  # subject (CN and SubjectAltName). The computed server name(s) usually
	  # change with each SslBump step, as more info becomes available:
	  # * SNI is used as the server name instead of the request URI,
	  # * subject name(s) from the server certificate (CN and
	  #   SubjectAltName) are used as the server names instead of SNI.
	  #
	  # When the ACL computes multiple server names, matching any single
	  # computed name is sufficient for the ACL to match.
	  #
	  # The "none" name can be used to match transactions where the ACL
	  # could not compute the server name using any information source
	  # that was both available and allowed to be used by the ACL options at
	  # the ACL evaluation time.
	  #
	  # Unlike dstdomain, this ACL does not perform DNS lookups.
	  #
	  # An ACL option below may be used to restrict what information 
	  # sources are used to extract the server names from:
	  #
	  # --client-requested
	  #   The server name is SNI regardless of what the server says.
	  # --server-provided
	  #   The server name(s) are the certificate subject name(s), regardless
	  #   of what the client has requested. If the server certificate is
	  #   unavailable, then the name is "none".
	  # --consensus
	  #   The server name is either SNI (if SNI matches at least one of the
	  #   certificate subject names) or "none" (otherwise). When the server
	  #   certificate is unavailable, the consensus server name is SNI.
	  #
	  # Combining multiple options in one ACL is a fatal configuration
	  # error.
	  #
	  # For all options: If no SNI is available, then the CONNECT request
	  # target (a.k.a. URI) is used instead of SNI (for an intercepted
	  # connection, this target is the destination IP address).
	
	acl aclname ssl::server_name_regex [-i] \.foo\.com ...
	  # regex matches server name obtained from various sources [fast]
	
	acl aclname connections_encrypted
	  # matches transactions with all HTTP messages received over TLS
	  # transport connections. [fast]
	  #
	  # The master transaction deals with HTTP messages received from
	  # various sources. All sources used by the master transaction in the
	  # past are considered by the ACL. The following rules define whether
	  # a given message source taints the entire master transaction,
	  # resulting in ACL mismatches:
	  #
	  #  * The HTTP client transport connection is not TLS.
	  #  * An adaptation service connection-encryption flag is off.
	  #  * The peer or origin server transport connection is not TLS.
	  #
	  # Caching currently does not affect these rules. This cache ignorance
	  # implies that only the current HTTP client transport and REQMOD
	  # services status determine whether this ACL matches a from-cache
	  # transaction. The source of the cached response does not have any
	  # effect on future transaction that use the cached response without
	  # revalidation. This may change.
	  #
	  # DNS, ICP, and HTCP exchanges during the master transaction do not
	  # affect these rules.
ENDIF
	acl aclname any-of acl1 acl2 ...
	  # match any one of the acls [fast or slow]
	  # The first matching ACL stops further ACL evaluation.
	  #
	  # ACLs from multiple any-of lines with the same name are ORed.
	  # For example, A = (a1 or a2) or (a3 or a4) can be written as
	  #   acl A any-of a1 a2
	  #   acl A any-of a3 a4
	  #
	  # This group ACL is fast if all evaluated ACLs in the group are fast
	  # and slow otherwise.

	acl aclname all-of acl1 acl2 ... 
	  # match all of the acls [fast or slow]
	  # The first mismatching ACL stops further ACL evaluation.
	  #
	  # ACLs from multiple all-of lines with the same name are ORed.
	  # For example, B = (b1 and b2) or (b3 and b4) can be written as
	  #   acl B all-of b1 b2
	  #   acl B all-of b3 b4
	  #
	  # This group ACL is fast if all evaluated ACLs in the group are fast
	  # and slow otherwise.
