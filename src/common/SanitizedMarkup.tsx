import purify from "dompurify";

const defaultOptions = {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
        'a': [ 'href' ]
    }
};

export const SanitizedMarkup = ({dirtyHtml}: any) => {
    const htmlSanatized = purify.sanitize(dirtyHtml);

    return (
        <div dangerouslySetInnerHTML={{__html : htmlSanatized}}>
        </div>
    )
}

export default SanitizedMarkup;