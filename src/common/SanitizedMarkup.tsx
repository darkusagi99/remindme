import purify from "dompurify";

export const SanitizedMarkup = ({dirtyHtml}: any) => {
    const htmlSanatized = purify.sanitize(dirtyHtml);

    return (
        <div dangerouslySetInnerHTML={{__html : htmlSanatized}}>
        </div>
    )
}

export default SanitizedMarkup;