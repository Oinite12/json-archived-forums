/** 
 * Since the actual input file that can show the file name is hidden because a lable is put
 * in place for it, this function is needed to show the file name in a div element
**/
function fileUploaded() {
    document.querySelector("#currentFile").innerText = "File selected: " + document.querySelector("#fileInput").files[0].name
}

var threadJSON;

/** 
 * Holy **** this link is a lifesaver 
 * https://gomakethings.com/how-to-upload-and-process-a-json-file-with-vanilla-js/
 * So basically the script does a much better job at uploading a JSON file than 
 * anything I could come up with
**/
var form = document.querySelector("#fileForm");
var file = document.querySelector("#fileInput");

form.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    if (!file.value.length) return;

    var reader = new FileReader();
    reader.onload = function logFile (event) {
        var str = event.target.result;
        threadJSON = JSON.parse(str);
    };
    reader.readAsText(file.files[0]);
    document.querySelector("#status").innerText = "Status: File uploaded!";
});

// The part where the JSON is actually interpreted

document.getElementById("JSONterpret").onclick = function (){
    for (i = document.querySelectorAll(".threadMsg").length - 1; i > 0; i--) {
        document.querySelectorAll(".threadMsg")[i].remove();
    }

    document.querySelector("#thread").style.display = "block";
    document.querySelector("#wikiForumNames").innerText = threadJSON.wiki + " - " + threadJSON.id;
    document.querySelector("#wikiForumNames").style.display = "block";
    document.querySelector("#threadIDName").innerText = threadJSON.forumBoard + " - " + threadJSON.threadName;
    document.querySelector("#threadIDName").style.display = "block";

    if (threadJSON.closingMessage) {
        document.querySelector("#closeBox").style = "display: flex"
        if (typeof threadJSON.closingMessage == "object") {
            document.querySelector("#closerPfp").src = threadJSON.closingMessage.avatar;
            document.querySelector("#closerPfp").classList.remove("hidden");
            document.querySelector("#closerPfp").alt = threadJSON.closingMessage.closer;
            document.querySelector("#closeHeader").innerText = "This thread was closed by " + threadJSON.closingMessage.closer + " for the following reason:";
            document.querySelector("#closeHeader").classList.remove("hidden");
            document.querySelector("#closeReason").innerText = threadJSON.closingMessage.reason;
            document.querySelector("#closeReason").classList.remove("hidden");
            document.querySelector("#closeTime").innerText = threadJSON.closingMessage.closingTime;
            document.querySelector("#closeTime").classList.remove("hidden");
        } else if (typeof threadJSON.closingMessage == "string") {
            document.querySelector("#closerPfp").classList.add("hidden");
            document.querySelector("#closeHeader").innerText = "This discussion post was locked.";
            document.querySelector("#closeHeader").classList.add("hidden");
            document.querySelector("#closeReason").classList.add("hidden");
            document.querySelector("#closeTime").classList.add("hidden");
        }
    } else document.querySelector("#closeBox").style = "display: none";

    var openingMessage = document.querySelector("#openingMsg");
    openingMessage.dataset.threadid = threadJSON.id;
    openingMessage.querySelector("#openerPfp").src = threadJSON.users.find(x => x.username === threadJSON.messages[0].poster).avatar;
    openingMessage.querySelector("#openerPfp").alt = threadJSON.messages[0].poster;
    openingMessage.querySelector(".kudosCount").innerText = threadJSON.messages[0].kudos + " kudos";
    openingMessage.querySelector("#threadName").innerText = threadJSON.threadName;
    openingMessage.querySelector("#threadOpener").innerText = threadJSON.messages[0].poster;
    openingMessage.querySelector("#openingText").innerHTML = threadJSON.messages[0].post;
    if (/<\/?[a-z][\s\S]*>/i.test(threadJSON.messages[i].post) == false) {
        openingMessage.querySelector("#openingText").classList.add("simple");
    };
    if (threadJSON.messages[0].editor) {
        openingMessage.querySelector("#openingTime").innerText = "Edited by " + threadJSON.messages[0].editor + " at " + threadJSON.messages[0].timePosted;
    } else openingMessage.querySelector("#openingTime").innerText = threadJSON.messages[0].timePosted;

    for (i = 1; i<threadJSON.messages.length; i++) {
        var threadMessage = document.createElement("div");
        threadMessage.setAttribute("class", "threadMsg");
        threadMessage.setAttribute("data-msgID", i+1);
        document.querySelector("#thread").appendChild(threadMessage);

        if (threadJSON.messages[i].remover) {
            if (threadJSON.messages[i].remover.reason) {
            var removeBox = document.createElement("div");
            removeBox.setAttribute("class", "closeRemoveBox");
            threadMessage.appendChild(removeBox);

                var removerAvatar = document.createElement("img");
                removerAvatar.setAttribute("class", "pfp");
                removerAvatar.setAttribute("src", threadJSON.messages[i].remover.avatar);
                removerAvatar.setAttribute("width", 30);
                removerAvatar.setAttribute("height", 30);
                removerAvatar.setAttribute("alt", threadJSON.messages[i].remover.closer);
                removeBox.appendChild(removerAvatar);

                var removeText = document.createElement("div");
                removeText.setAttribute("class", "removeText");
                removeBox.appendChild(removeText);

                    var removeHeader = document.createElement("div");
                    removeHeader.setAttribute("class", "removeHeader");
                    removeHeader.innerText = "This message was removed by " + threadJSON.messages[i].remover.closer + " for the following reason:";
                    removeText.appendChild(removeHeader);

                    var removeReason = document.createElement("div");
                    removeReason.setAttribute("class", "removeReason");
                    removeReason.innerText = threadJSON.messages[i].remover.reason;
                    removeText.appendChild(removeReason);

                    var removeTime = document.createElement("div");
                    removeTime.setAttribute("class", "removeTime");
                    removeTime.innerText = threadJSON.messages[i].remover.closingTime;
                    removeText.appendChild(removeTime);
            };
        }

        if (threadJSON.messages[i].post) {
            var messageInfo = document.createElement("div");
            messageInfo.setAttribute("class", "msgInfo");
            threadMessage.appendChild(messageInfo);

                var posterAvatar = document.createElement("img");
                posterAvatar.setAttribute("class", "pfp");
                posterAvatar.setAttribute("src", threadJSON.users.find(x => x.username === threadJSON.messages[i].poster).avatar);
                posterAvatar.setAttribute("width", 45);
                posterAvatar.setAttribute("height", 45);
                posterAvatar.setAttribute("alt", threadJSON.messages[i].poster);
                messageInfo.appendChild(posterAvatar);

                var messageContent = document.createElement("div");
                messageContent.setAttribute("class", "msgContent");
                messageInfo.appendChild(messageContent);

                    var kudosCount = document.createElement("div");
                    kudosCount.setAttribute("class", "kudosCount");
                    kudosCount.innerText = threadJSON.messages[i].kudos + " kudos";
                    messageContent.appendChild(kudosCount);

                    var messagePoster = document.createElement("div");
                    messagePoster.setAttribute("class", "msgPoster");
                    messagePoster.innerText = threadJSON.messages[i].poster;
                    messageContent.appendChild(messagePoster);

                    var messageText = document.createElement("div");
                    messageText.setAttribute("class", "msgText");
                    if (/<\/?[a-z][\s\S]*>/i.test(threadJSON.messages[i].post) == false) {
                        messageText.classList.add("simple");
                    };
                    messageText.innerHTML = threadJSON.messages[i].post;
                    messageContent.appendChild(messageText);

                    var messageTime = document.createElement("div");
                    messageTime.setAttribute("class", "msgTime");
                    if (threadJSON.messages[i].editor) {
                        messageTime.innerText = "Edited by " + threadJSON.messages[i].editor + " at " + threadJSON.messages[i].timePosted;
                    } else messageTime.innerText = threadJSON.messages[i].timePosted;
                    messageContent.appendChild(messageTime);
        }
    }
    document.querySelector("#status").innerText = "Status: JSONterpreted!";
}
