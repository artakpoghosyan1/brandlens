export const getBrowserPermissions = (query: PermissionName): Promise<PermissionStatus> => {
    return navigator.permissions.query({ name: query })
}
