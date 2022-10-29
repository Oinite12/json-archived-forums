/** 
 * Since the actual input file that can show the file name is hidden because a lable is put
 * in place for it, this function is needed to show the file name in a div element
**/
function fileUploaded() {
    document.querySelector("#currentFile").innerText = "File selected: " + document.querySelector("#fileInput").files[0].name
}

/** 
    * Holy **** this link is a lifesaver 
    * https://gomakethings.com/how-to-upload-and-process-a-json-file-with-vanilla-js/
    * So basically the script does a much better job at uploading a JSON file than 
    * anything I could come up with
**/
const form = document.querySelector("#fileForm"), file = document.querySelector("#fileInput");

form.addEventListener('change', function handleSubmit(event) {
    event.preventDefault();
    if (!file.value.length) return;

    let reader = new FileReader();
    reader.onload = function logFile (event) {
        let str = event.target.result;
        let threadJSON = JSON.parse(str);

        // Remove every reply post if there are any
        for (i = document.querySelectorAll(".threadMsg").length - 1; i > 0; i--) {
            document.querySelectorAll(".threadMsg")[i].remove();
        }

        // Start setting up the opening message
        document.querySelector("#thread").style.display = "block";
        document.querySelector("#wikiForumNames").innerText = threadJSON.wiki + " - " + threadJSON.id;
        document.querySelector("#wikiForumNames").style.display = "block";
        document.querySelector("#threadIDName").innerText = threadJSON.forumBoard + " - " + threadJSON.threadName;
        document.querySelector("#threadIDName").style.display = "block";

        // If the thread was closed
        if (threadJSON.closingMessage) {
            document.querySelector("#closeBox").style = "display: flex"

            // Thread closure - Closer, reason, avatar
            if (typeof threadJSON.closingMessage == "object") {
                document.querySelector("#closerPfp").classList.remove("hidden");
                // If no avatar is specified (6 underscores) then do not set these params
                if (threadJSON.closingMessage.avatar != "______") {
                    document.querySelector("#closerPfp").src = threadJSON.closingMessage.avatar;
                    document.querySelector("#closerPfp").alt = threadJSON.closingMessage.closer;
                } else {
                    document.querySelector("#closerPfp").removeAttribute("src");
                    document.querySelector("#closerPfp").removeAttribute("alt");
                }

                // Who closed it?
                document.querySelector("#closeHeader").innerText = "This thread was closed by " + threadJSON.closingMessage.closer + " for the following reason:";
                document.querySelector("#closeHeader").classList.remove("hidden");
                // Why was the thread closed?
                document.querySelector("#closeReason").innerText = threadJSON.closingMessage.reason;
                document.querySelector("#closeReason").classList.remove("hidden");
                // When was it closed?
                document.querySelector("#closeTime").innerText = threadJSON.closingMessage.closingTime;
                document.querySelector("#closeTime").classList.remove("hidden");

            // Discussion closure - only say "This discussion post was locked"
            } else if (typeof threadJSON.closingMessage == "string") {
                document.querySelector("#closerPfp").classList.add("hidden");
                document.querySelector("#closeHeader").innerText = "This discussion post was locked.";
                document.querySelector("#closeHeader").classList.add("hidden");
                document.querySelector("#closeReason").classList.add("hidden");
                document.querySelector("#closeTime").classList.add("hidden");
            }
        // If thread wasn't closed, hide the closing box
        } else document.querySelector("#closeBox").style = "display: none";

        // Set the opening user and post
        let openingMessage = document.querySelector("#openingMsg");
        openingMessage.dataset.threadid = threadJSON.id;
        // Avatar
        if (threadJSON.users.find(x => x.username === threadJSON.messages[0].poster).avatar != "______") {
            openingMessage.querySelector("#openerPfp").src = threadJSON.users.find(x => x.username === threadJSON.messages[0].poster).avatar;
            openingMessage.querySelector("#openerPfp").alt = threadJSON.messages[0].poster;
        } else {
            openingMessage.querySelector("#openerPfp").removeAttribute("src")
            openingMessage.querySelector("#openerPfp").removeAttribute("alt")
        }
        // Kudos
        openingMessage.querySelector(".kudosCount").innerText = threadJSON.messages[0].kudos + " kudos";
        // Thread name
        openingMessage.querySelector("#threadName").innerText = threadJSON.threadName;
        // Person who made post
        openingMessage.querySelector("#threadOpener").innerText = threadJSON.messages[0].poster;
        // Text
        openingMessage.querySelector("#openingText").innerHTML = threadJSON.messages[0].post;
        if (/<\/?[a-z][\s\S]*>/i.test(threadJSON.messages[i].post) == false) {
            openingMessage.querySelector("#openingText").classList.add("simple");
        };
        // Person who edited post
        if (threadJSON.messages[0].editor) {
            openingMessage.querySelector("#openingTime").innerText = "Edited by " + threadJSON.messages[0].editor + " at " + threadJSON.messages[0].timePosted;
        } else openingMessage.querySelector("#openingTime").innerText = threadJSON.messages[0].timePosted;

        // For EACH message in the thread
        for (i = 1; i<threadJSON.messages.length; i++) {
            // Create a container for the post
            let threadMessage = document.createElement("div");
            threadMessage.setAttribute("class", "threadMsg");
            threadMessage.setAttribute("data-msgID", i+1);
            document.querySelector("#thread").appendChild(threadMessage);
            
            // If the post was removed:
            if (threadJSON.messages[i].remover) {
                // (Had to put this because I was an idiot and added an
                // empty object for -every- remover parameter in all archives
                if (threadJSON.messages[i].remover.reason) {
                    // Container of remove stuff
                    let removeBox = document.createElement("div");
                    removeBox.setAttribute("class", "closeRemoveBox");
                    threadMessage.appendChild(removeBox);

                    // Avatar of remover
                    let removerAvatar = document.createElement("img");
                    removerAvatar.setAttribute("class", "pfp");
                    removerAvatar.setAttribute("width", 45);
                    removerAvatar.setAttribute("height", 45);
                    if (threadJSON.messages[i].remover.avatar != "______") {
                        removerAvatar.setAttribute("src", threadJSON.messages[i].remover.avatar);
                        removerAvatar.setAttribute("alt", threadJSON.messages[i].remover.closer);
                    }
                    removeBox.appendChild(removerAvatar);

                    // Container of text (separate from avatar)
                    let removeText = document.createElement("div");
                    removeText.setAttribute("class", "removeText");
                    removeBox.appendChild(removeText);
                    
                    // Person who removed
                    let removeHeader = document.createElement("div");
                    removeHeader.setAttribute("class", "removeHeader");
                    removeHeader.innerText = "This message was removed by " + threadJSON.messages[i].remover.closer + " for the following reason:";
                    removeText.appendChild(removeHeader);

                    // Remove reason
                    let removeReason = document.createElement("div");
                    removeReason.setAttribute("class", "removeReason");
                    removeReason.innerText = threadJSON.messages[i].remover.reason;
                    removeText.appendChild(removeReason);

                    // Time of removal
                    let removeTime = document.createElement("div");
                    removeTime.setAttribute("class", "removeTime");
                    removeTime.innerText = threadJSON.messages[i].remover.closingTime;
                    removeText.appendChild(removeTime);
                };
            }

            // Some posts do not exist because they've been removed, hence the 'if'
            if (threadJSON.messages[i].post) {
                // Container for message stuff
                let messageInfo = document.createElement("div");
                messageInfo.setAttribute("class", "msgInfo");
                threadMessage.appendChild(messageInfo);

                // Avatar of poster
                let posterAvatar = document.createElement("img");
                posterAvatar.setAttribute("class", "pfp");
                posterAvatar.setAttribute("width", 45);
                posterAvatar.setAttribute("height", 45);
                if (threadJSON.users.find(x => x.username === threadJSON.messages[i].poster).avatar != "______") {
                    posterAvatar.setAttribute("src", threadJSON.users.find(x => x.username === threadJSON.messages[i].poster).avatar);
                    posterAvatar.setAttribute("alt", threadJSON.messages[i].poster);
                }
                messageInfo.appendChild(posterAvatar);

                // Container of text
                let messageContent = document.createElement("div");
                messageContent.setAttribute("class", "msgContent");
                messageInfo.appendChild(messageContent);

                // Kudos count
                let kudosCount = document.createElement("div");
                kudosCount.setAttribute("class", "kudosCount");
                kudosCount.innerText = threadJSON.messages[i].kudos + " kudos";
                messageContent.appendChild(kudosCount);

                // Person who posted the message
                let messagePoster = document.createElement("div");
                messagePoster.setAttribute("class", "msgPoster");
                messagePoster.innerText = threadJSON.messages[i].poster;
                messageContent.appendChild(messagePoster);

                // Post text
                let messageText = document.createElement("div");
                messageText.setAttribute("class", "msgText");
                if (/<\/?[a-z][\s\S]*>/i.test(threadJSON.messages[i].post) == false) {
                    messageText.classList.add("simple");
                };
                messageText.innerHTML = threadJSON.messages[i].post;
                messageContent.appendChild(messageText);

                // Time of posting / editing
                let messageTime = document.createElement("div");
                messageTime.setAttribute("class", "msgTime");
                if (threadJSON.messages[i].editor) {
                    messageTime.innerText = "Edited by " + threadJSON.messages[i].editor + " at " + threadJSON.messages[i].timePosted;
                } else messageTime.innerText = threadJSON.messages[i].timePosted;
                messageContent.appendChild(messageTime);
            }
        }
        document.querySelector("#status").innerText = "Status: JSONterpreted!";
    };
    reader.readAsText(file.files[0]);
    document.querySelector("#status").innerText = "Status: File uploaded!";
});
