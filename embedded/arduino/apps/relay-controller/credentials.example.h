#ifndef LIB_CREDENTIALS_H
#define LIB_CREDENTIALS_H

static const char* ssid = "<your-wifi-ssid>";
static const char* pass = "<your-wifi-password>";

// Replace with your own MQTT provider
static const char* mqtt_broker_url = "broker.hivemq.com";
static const int mqtt_broker_port = 1883;

// Leave NULL if not used
static const char* mqtt_username;
static const char* mqtt_password;

static const char* mqtt_topic = "<root-id>/path/to/device";

#endif //  LIB_CREDENTIALS_H