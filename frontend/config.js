export let SERVER_URL = import.meta.env.DEV ?
    import.meta.env.VITE_API_LOCAL_SERVER_URL :
    import.meta.env.VITE_API_DEPLOYED_SERVER_URL

