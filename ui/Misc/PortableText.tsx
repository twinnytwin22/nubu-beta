import React from 'react';

interface MarkDef {
    _key: string;
    _type: string;
    extraData: string;
}

interface Span {
    _type: 'span';
    marks: string[];
    text: string;
}

interface Block {
    _type: 'block';
    style: string;
    children: (Span | string)[];
    markDefs: MarkDef[];
}

interface PortableTextProps {
    content: Block[];
}

const PortableText: React.FC<PortableTextProps> = ({ content }) => {
    return (
        <div>
            {content.map((block, index) => {
                if (block._type === 'block') {
                    return (
                        <p key={index}>
                            {block.children.map((child, childIndex) => {
                                if (typeof child === 'string') {
                                    return child; // Plain text
                                } else {
                                    const marks = child.marks.map(mark => {
                                        const markDef = block.markDefs.find(def => def._key === mark);
                                        if (markDef) {
                                            return <em key={mark}>{markDef.extraData}</em>; // Apply mark
                                        }
                                        return null;
                                    });
                                    return <span key={childIndex}>{marks}{child.text}</span>;
                                }
                            })}
                        </p>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default PortableText;
