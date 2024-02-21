import data from "./data.js";
const userContainer = document.querySelector(".user-container");
document.querySelectorAll(".send-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = document.querySelector("textarea").value;
    currentUserComment(data.comments.length, value, "just now");
    console.log(data);
  });
});
data.comments.map((v) => {
  const comment = `
 <div class="user">
            <div class="comment_div">
              <div class="desktop-votes">
                <span class="plus cursor-pointer">
                  <img src="images/icon-plus.svg" alt="" />
                </span>
                <span class="vote-num"> ${v.score} </span>
                <span class="minus cursor-pointer">
                  <img src="images/icon-minus.svg" alt="" />
                </span>
              </div>
              <div>
                <div class="profile-div">
                  <div>
                    <span class="user-pic">
                      <img src=${v.user.image.png} alt="" />
                    </span>
                    <span class="user-name"> ${v.user.username} </span>
                    <span class="post-date"> ${v.createdAt} </span>
                  </div>
                  <div class="desktop-reply-btn cursor-pointer">
                    <span>
                      <img src="images/icon-reply.svg" alt="" />
                      Reply
                    </span>
                  </div>
                </div>
                <div class="user-comment">
                  <p>
                    ${v.content}
                  </p>
                </div>
                <div class="mobile-stats">
                  <div class="mobile-votes">
                    <span class="plus cursor-pointer">
                      <img src="images/icon-plus.svg" alt="" />
                    </span>
                    <span class="vote-num"> ${v.score} </span>
                    <span class="minus cursor-pointer">
                      <img src="images/icon-minus.svg" alt="" />
                    </span>
                  </div>
                  <span class="mobile-reply-btn cursor-pointer">
                    <img src="images/icon-reply.svg" alt="" /> Reply</span
                  >
                </div>
              </div>
            </div>
            ${v.replies
              .map((rep) => {
                return `
                <div class="comment_div reply">
            <div class="desktop-votes">
              <span class="plus cursor-pointer">
                <img src="images/icon-plus.svg" alt="" />
              </span>
              <span class="vote-num"> ${rep.score} </span>
              <span class="minus cursor-pointer">
                <img src="images/icon-minus.svg" alt="" />
              </span>
            </div>
            <div>
              <div class="profile-div">
                <div>
                  <span class="user-pic">
                    <img src=${rep.user.image.png} alt="" />
                  </span>
                  <span class="user-name"> ${rep.user.username} </span>
                  <span class="post-date"> ${rep.createdAt} </span>
                </div>
                <div class="desktop-reply-btn cursor-pointer">
                  <span>
                    <img src="images/icon-reply.svg" alt="" />
                    Reply
                  </span>
                </div>
              </div>
              <div class="user-comment">
                <span class="reply-to">@${rep.replyingTo}</span>
                <p>
                  Impressive! Though it seems the drag feature could be
                  improved. But overall it looks incredible. You've nailed the
                  design and the responsiveness at various breakpoints works
                  really well.
                </p>
              </div>
              <div class="mobile-stats">
                <div class="mobile-votes">
                  <span class="plus cursor-pointer">
                    <img src="images/icon-plus.svg" alt="" />
                  </span>
                  <span class="vote-num"> ${rep.score} </span>
                  <span class="minus cursor-pointer">
                    <img src="images/icon-minus.svg" alt="" />
                  </span>
                </div>
                <span class="mobile-reply-btn cursor-pointer">
                  <img src="images/icon-reply.svg" alt="" /> Reply</span
                >
              </div>
            </div>
          </div>`;
              })
              .join("")}
        </div>`;
  userContainer.insertAdjacentHTML("beforeend", comment);
});
function currentUserComment(index, content, createdAt) {
  data.comments[index] = {
    id: index+1,
    content: content,
    score: 0,
    createdAt: createdAt,
    replies: [],
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.png",
      },
      username: "juliusomo",
    },
  };
}
function currentUserReply(
  commentIndex,
  replIndex,
  id,
  content,
  replyingTo,
  createdAt,
  score
) {
  data.comments[commentIndex].replies[replIndex] = {
    id: id,
    content: content,
    createdAt: createdAt,
    score: score,
    replyingTo: replyingTo,
  };
}
