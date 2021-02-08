# services-portal
Simple web portal for use, when you have multiple running services (websites) and you are unable to remember them all.

# Usage
Css class `link-internal` is used as mark of link, which will work only in internal network. JS will check access to internal network by sending request, if `HEAD` HTTP method to first internal-link does not succeed, than all elements with class `link-internal` are darken. Therefor marked as unavalible.