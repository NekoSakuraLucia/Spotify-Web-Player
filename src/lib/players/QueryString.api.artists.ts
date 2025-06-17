// Types
export type QueryParamValue = string | number | null;

// Function
export function QueryString<Types extends Record<string, QueryParamValue>>(
    queryparam: Types,
) {
    const filteredParam = Object.keys(queryparam)
        .filter((key) => queryparam[key as keyof Types] !== null)
        .map((key) => `${key}=${queryparam[key as keyof Types]}`)
        .join('&');

    return filteredParam ? `?${filteredParam}` : '';
}
