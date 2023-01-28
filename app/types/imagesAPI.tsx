export type ImagesAPI = {
    id: string;
    url: string;
    width: number;
    height: number;
    color: number;
    preview: {
        url: string;
        width: number;
        height: number;
    };
    origin: {
        title: string;
        website: {
            name: string;
            domain: string;
            url: string;
        };
    };
}