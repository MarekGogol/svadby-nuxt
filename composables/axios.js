import axios from 'axios';

const setLoading = ($axios, state) => {
    let args = $axios._onLoading;

    if (!args || !args.length) {
        return;
    }

    let callback = args[0],
        key = args[1];

    if (typeof callback == 'function') {
        callback(state);
    }

    if (callback && 'value' in callback) {
        if (key) {
            callback.value[key] = state;
        } else {
            callback.value = state;
        }
    }
};

export const addInterceptors = ($axios, addHeaders) => {
    $axios.interceptors.request.use(
        (successfulReq) => {
            setLoading($axios, true);

            //Push admin headers into each request
            if (successfulReq.headers) {
                // prettier-ignore
                // console.log('[AXIOS]', successfulReq.method.toUpperCase(), '-', successfulReq.url);

                //Add cart and auth headers into axios
                var appHeaders =
                    typeof addHeaders == 'function' ? addHeaders() : {};

                for (var key in appHeaders) {
                    successfulReq.headers[key] = appHeaders[key];
                }
            }

            return successfulReq;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    $axios.interceptors.response.use(
        function (response) {
            //Toggle loading state
            setLoading($axios, false);

            return response;
        },
        function (error) {
            //Toggle loading state
            setLoading($axios, false);

            return Promise.reject(error);
        }
    );
};

const addCustomMethods = ($axios) => {
    for (let method of [
        'request',
        'delete',
        'get',
        'head',
        'options',
        'post',
        'put',
        'patch',
    ]) {
        $axios['$' + method] = async function () {
            return this[method]
                .apply(this, arguments)
                .then((res) => res && res.data);
        };
    }

    $axios['$getOnline'] = function (url, data, errorMessage) {
        useThrowConnectionAlert(errorMessage);

        return this.$get(url, data);
    };

    $axios['$postOnline'] = function (url, data, options, errorMessage) {
        useThrowConnectionAlert(errorMessage);

        return this.$post(url, data, options);
    };

    $axios['$deleteOnline'] = function (url, data, options, errorMessage) {
        useThrowConnectionAlert(errorMessage);

        return this.$delete(url, data, options);
    };

    $axios['$getAsync'] = async function (url, data, options) {
        return await asyncRequest('get', url, data, options, $axios);
    };

    $axios['$postAsync'] = async function (url, data, options) {
        return await asyncRequest('post', url, data, options, $axios);
    };

    $axios['$deleteAsync'] = async function (url, data, options) {
        return await asyncRequest('delete', url, data, options, $axios);
    };

    $axios['loading'] = function (variableOrCallback, variableKey = null) {
        this._onLoading = [variableOrCallback, variableKey];

        return this;
    };

    const asyncRequest = async (method, url, data, options, $axios) => {
        $axios = $axios || useAxios();

        //Set key of request for redundancy
        if (typeof options == 'string') {
            options = { key: options };
        }

        options = options || {};

        const requestForLater = {
            method,
            url,
            data,
            key: options.key,
        };

        //Don't make request if error request of same request is already scheduled on future. Wait...
        //It will happen automatically
        const alreadyScheduled =
            useAjaxStore().isAlreadyScheduled(requestForLater);
        // prettier-ignore
        if ( options._forceCheck !== true && alreadyScheduled.length ) {
            console.log('[AJAX] already scheduled at', alreadyScheduled[0].nextTryAt,alreadyScheduled[0]);
            return;
        }

        try {
            let response = await $axios['$' + method](url, data);

            useAutoAjaxResponse(response);

            if (options.callback) {
                await options.callback();
            }

            return response;
        } catch (e) {
            if (options._isRepeatedTry) {
                throw Error(e);
            } else {
                //Save request for later send
                useAjaxStore().sendRequestLater(requestForLater);

                //Show error in console
                console.error(e);
            }
        }
    };
};

export const createAxios = (options = {}) => {
    const $axios = axios.create({
        ...options,
        headers: {
            common: {},
        },
    });

    addInterceptors($axios, options.addHeaders);

    // Request helpers ($get, $post, ...)
    addCustomMethods($axios);

    return $axios;
};

export const useAppBaseUrl = () => {
    return import.meta.env.VITE_APP_SERVER_URL;
};

export const useAppHeaders = (options = {}) => {
    let obj = {},
        enabledHeaders = options.enabledHeaders || {};

    //Authorization
    // if (enabledHeaders.authorization !== false) {
    //     let token = useAuthStore().token;

    //     if (token) {
    //         obj['Authorization'] = 'Bearer ' + token.token;
    //     }
    // }

    // let locale = useLocaleStore().locale;
    // if (locale) {
    //     obj['app-locale'] = locale;
    // }

    // obj = Object.assign(obj, usePlatformHeaders() || {});

    return obj;
};

export const useAxios = (options) => {
    const headers = useAppHeaders(options);

    const $axios = createAxios({
        baseURL: useAppBaseUrl(),
        addHeaders() {
            return headers;
        },
        ...options,
    });

    return $axios;
};
