## title 1.1

### title 1.1.1

#### title 1.1.1.1

##### title 1.1.1.1.1

###### title 1.1.1.1.1.1

Content for 1.1.1.1.1.1.

###### title 1.1.1.1.1.2

Content for 1.1.1.1.1.2.

##### title 1.1.1.1.2

###### title 1.1.1.1.2.1

Content for 1.1.1.1.2.1.

###### title 1.1.1.1.2.2

Content for 1.1.1.1.2.2.

#### title 1.1.1.2

##### title 1.1.1.2.1

###### title 1.1.1.2.1.1

Content for 1.1.1.2.1.1.

###### title 1.1.1.2.1.2

Content for 1.1.1.2.1.2.

### title 1.1.2

#### title 1.1.2.1

##### title 1.1.2.1.1

###### title 1.1.2.1.1.1

Content for 1.1.2.1.1.1.

###### title 1.1.2.1.1.2

Content for 1.1.2.1.1.2.

#### title 1.1.2.2

##### title 1.1.2.2.1

###### title 1.1.2.2.1.1

Content for 1.1.2.2.1.1.

###### title 1.1.2.2.1.2

Content for 1.1.2.2.1.2.

## title 1.2

### title 1.2.1

#### title 1.2.1.1

##### title 1.2.1.1.1

###### title 1.2.1.1.1.1

Content for 1.2.1.1.1.1.

###### title 1.2.1.1.1.2

Content for 1.2.1.1.1.2.

#### title 1.2.1.2

##### title 1.2.1.2.1

###### title 1.2.1.2.1.1

Content for 1.2.1.2.1.1.

###### title 1.2.1.2.1.2

Content for 1.2.1.2.1.2.

**From [issue #2](https://github.com/zhangyu1818/react-markdown-toc/issues/2), and standardize the format of some content.**

## **Class: AccessControl**

The **`AccessControl`** class provides a comprehensive system for managing user permissions and quotas. It leverages caching mechanisms to optimize performance by reducing the frequency of HTTP requests for data retrieval.**[URL​](https://docs.kobble.io/libraries/fullstack-sdk/next/references/classes/access-control#public-methods)**

### **Public Methods [URL​](https://docs.kobble.io/libraries/fullstack-sdk/next/references/classes/access-control#listpermissions-options-nocache-boolean-promise-permission)**

**`listPermissions(options?: { noCache?: boolean }): Promise<Permission[]>`**

**Parameters:**

- **`options`**: **`object`** (optional) - Configuration options for the request.
- **`noCache`**: **`boolean`** (optional) - If set to true, bypasses the cache and fetches permissions directly from the server.

**Returns:** **`Promise<Permission[]>`** - A promise that resolves to an array of permissions.

**Description:** Retrieves the list of permissions for the logged-in user. It first checks the cache; if not found or if **`noCache`** is true, it fetches from the server.

### **[URL​](https://docs.kobble.io/libraries/fullstack-sdk/next/references/classes/access-control#listquotas-options-nocache-boolean-promise-quota)**

**`listQuotas(options?: { noCache?: boolean }): Promise<Quota[]>`**

**Parameters:**

- **`options`**: **`object`** (optional) - Configuration options for the request.
- **`noCache`**: **`boolean`** (optional) - If set to true, bypasses the cache and fetches quotas directly from the server.

**Returns:** **`Promise<Quota[]>`** - A promise that resolves to an array of quota usages.

**Description:** Retrieves the list of quotas for the logged-in user in a similar fashion to **`listPermissions`**, utilizing caching and direct server fetch logic based on the provided options.

### **[URL​](https://docs.kobble.io/libraries/fullstack-sdk/next/references/classes/access-control#haspermission-permissionnames-string-string-promise-boolean)**

### **`hasPermission(permissionNames: string[] | string): Promise<boolean>`**

**Parameters:**

- **`permissionNames`**: **`string[] | string`** - The names of the permissions to check. Can be a single name or an array of names.

**Returns:** **`Promise<boolean>`** - A promise that resolves to **`true`** if all specified permissions are granted to the user, **`false`** otherwise.

**Description:** Checks if the logged-in user possesses all specified permissions. It handles both single permission checks and arrays of permissions.

### **[URL​](https://docs.kobble.io/libraries/fullstack-sdk/next/references/classes/access-control#hasremainingquota-quotanames-string-string-promise-boolean)**

### **`hasRemainingQuota(quotaNames: string | string[]): Promise<boolean>`**

**Parameters:**

- **`quotaNames`**: **`string[] | string`** - The names of the quotas to check. Can be a single name or an array of names.

**Returns:** **`Promise<boolean>`** - A promise that resolves to **`true`** if the user has unused quotas for all specified items, **`false`** otherwise.

**Description:** Evaluates if the user has remaining quota for specified items.
