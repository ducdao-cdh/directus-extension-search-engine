export const escapeHtml = (text: string) => {
    return text ? text?.replace(/(<([^>]+)>)/gi, '') : text
}
