import React from "react";

const TermOfUse = () => {
    return (
        <div className="container card legal custom-shadow mt-4 mb-4">
            <div className="card-body">
                <h2>Term of use</h2>
                <hr />

                <h4>
                    <b>What is Lorem Ipsum?</b>
                </h4>
                <p className="text-justify">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <h4>
                    <b>Why do we use it?</b>
                </h4>
                <p className="text-justify">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </div>
    );
};

export default TermOfUse;
