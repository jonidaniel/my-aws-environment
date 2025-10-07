aws ec2 run-instances --image-id \
"ami-0b83c7f5e2823d1f4" --instance-type \
"t3.micro" --key-name \
"my-web-server-key-pair" --user-data \
"IyEvYmluL2Jhc2ggLWV4CgojIEdldCBob3N0LCBwb3J0LCB1c2VyLCBwYXN \
zd29yZCwgYW5kIGRhdGFiYXNlIHBhcmFtZXRlcnMgZnJvbSB0aGUgQVdTIFN \
TTSBQYXJhbWV0ZXIgU3RvcmUgYW5kIHNhdmUgdGhlbSBpbiBhIGZpbGUKYXd \
zIHNzbSBnZXQtcGFyYW1ldGVycyAtLW5hbWVzIERCX0hPU1QgREJfUE9SVCB \
EQl9VU0VSIERCX1BXIERCX0RCIC0td2l0aC1kZWNyeXB0aW9uID4+IC9ob21 \
lL2VjMi11c2VyL3BhcmFtcy5qc29uCgojIEluc3RhbGwgTm9kZS5qcyBhbmQ \
gTlBNCnN1ZG8geXVtIC15IGluc3RhbGwgbm9kZWpzIG5wbQoKIyBEb3dubG9 \
hZCBUcmFuc2xhdGlvbiBHYW1lIGZyb20gYW4gQW1hem9uIFMzIGJ1Y2tldAp \
zdWRvIHdnZXQgLVAgL2hvbWUvZWMyLXVzZXIvIGh0dHBzOi8vdHJhbnNsYXR \
pb24tZ2FtZS5zMy5ldS1ub3J0aC0xLmFtYXpvbmF3cy5jb20vdHJhbnNsYXR \
pb24tZ2FtZS56aXAKCiMgVW56aXAgVHJhbnNsYXRpb24gR2FtZQpzdWRvIHV \
uemlwIC1kIC9ob21lL2VjMi11c2VyLyAvaG9tZS9lYzItdXNlci90cmFuc2x \
hdGlvbi1nYW1lLnppcAoKIyBEb3dubG9hZCBkZXBlbmRlbmNpZXMgYW5kIHN \
0YXJ0IGFuIEhUVFAgc2VydmVyIG9uIHBvcnQgODA4MCBhcyBhIGJhY2tncm9 \
1bmQgcHJvY2VzcwpjZCAvaG9tZS9lYzItdXNlci8Kc3VkbyBucG0gaQpzdWR \
vIG5vZGUgaW5kZXguanMgJgoKIyBEb3dubG9hZCBkZXBlbmRlbmNpZXMgYW5 \
kIHN0YXJ0IHRoZSBSZWFjdCBmcm9udGVuZCBvbiBwb3J0IDMwMDAgYXMgYSB \
iYWNrZ3JvdW5kIHByb2Nlc3MKY2QgL2hvbWUvZWMyLXVzZXIvZnJvbnRlbmQ \
vCnN1ZG8gbnBtIGkKc3VkbyBucG0gc3RhcnQgJgo=" --network-interfaces \
'{"SubnetId":"subnet-0ff90909ee35b9f2a", \
"AssociatePublicIpAddress":false,"DeviceIndex":0, \
"Groups":["sg-0cc86c3921d4f8a9f", \
"sg-03215ee420236a677"]}' --credit-specification \
'{"CpuCredits":"unlimited"}' --tag-specifications \
'{"ResourceType":"instance","Tags":[{"Key":"Name", \
"Value":"my-web-server"}]}' --iam-instance-profile \
'{"Arn":"arn:aws:iam::127214179619:instance-profile/ \
my-ssm-parameter-store-get-parameters- \
role-for-ec2"}' --metadata-options \
'{"HttpEndpoint":"enabled","HttpPutResponseHopLimit":2, \
"HttpTokens":"required"}' --private-dns-name-options \
'{"HostnameType":"ip-name","EnableResourceNameDnsARecord":false, \
"EnableResourceNameDnsAAAARecord":false}' --count "1"
