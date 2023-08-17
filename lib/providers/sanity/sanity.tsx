
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = '2021-10-21'

const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query`
const getOptions = { method: 'GET', headers: { 'Content-Type': "application/json" } }


async function fetchSanity(query: string) {
    const res = await fetch(`${baseUrl}=${query}`, getOptions)
    const data = await res.json()
    if (data) {
        return data.result
    } else {
        throw new Error('Error fetching data')
    }
}

export async function getSiteSettings() {
    const query: string = '*%5B_type%20%3D%3D%20%22siteSettings%22%5D'
    const res = await fetchSanity(query)


    return res[0];
}

export async function getBlogPosts() {
    const query: string = '*%5B_type%20%3D%3D%20%22blogPosts%22%5D'
    const res = await fetchSanity(query)
    //  console.log(res)
    const image = res[0].coverImage
    const imageRes = imageBuilder(image)
    console.log(imageRes, 'IMAGE')
    const slugs = res.map(({ slug }) => slug.current)
    if (res) {
        return { res: res, slugs, images: imageRes, success: true }
    } else {
        throw new Error
    };
}

// utils/imageUtils.js



// imageUtils.js

export function imageBuilder(inputString: any) {
    const imageRef = inputString?.asset._ref;
    const parts = imageRef.split('-');
    const imageId = parts.slice(1, -2).join('-'); // Extract the image ID
    const dimensions = parts[parts.length - 2]; // Extract the dimensions
    const extension = parts[parts.length - 1]; // Extract the image extension

    const baseURL = `https://cdn.sanity.io/images/48nz7smj/production/`;
    const imageURL = `${baseURL}${imageId}-${dimensions}.${extension}`;

    return imageURL;
}


export async function getPageContent() {
    const query: string = '*%5B_type%20%3D%3D%20%22page%22%5D'
    const res = await fetchSanity(query)

    const homePage = res[0]
    return { homePage }

}
