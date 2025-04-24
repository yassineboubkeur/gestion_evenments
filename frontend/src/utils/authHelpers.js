// src/utils/authHelpers.js
export const hasPermission = (requiredPermission) => {
    const permissions = JSON.parse(localStorage.getItem('permissions') || []);
    return permissions.includes(requiredPermission);
  };
  
  export const hasAnyPermission = (requiredPermissions) => {
    const userPermissions = JSON.parse(localStorage.getItem('permissions') || []);
    return requiredPermissions.some(perm => userPermissions.includes(perm));
  };
  
  export const hasAllPermissions = (requiredPermissions) => {
    const userPermissions = JSON.parse(localStorage.getItem('permissions') || []);
    return requiredPermissions.every(perm => userPermissions.includes(perm));
  };
  
  export const getUserRole = () => {
    return localStorage.getItem('role');
  };