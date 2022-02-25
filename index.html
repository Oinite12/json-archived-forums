<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .closeRemoveBox {
            margin: 10px;

            border: 2px dotted black;
            border-radius: 15px;

            padding: 15px;

            width: 50%;
            display: flex;
            gap: 15px;
            align-items: center;
        }

        #closeHeader, .removeHeader {
            margin-bottom: 0.25em;
            border-bottom: 1px dashed black;
            padding-bottom: 0.5em;
        }

        #closeTime, #openingTime, .removeTime, .msgTime {
            font-size: 0.75em;
        }

        #openingMsg {
            margin: 10px;

            border-radius: 15px;

            padding: 15px;

            background: rgb(219, 219, 219);
            width: 75%;
            display: flex;
            flex-flow: row;
            gap: 15px;
        }

        #openingInfo > h2 {
            margin: 0;
        }

        .kudosCount {
            position: absolute;
            display: inline-block;
            left: 57%;
            font-weight: bold;
        }

        #openingInfo > .kudosCount {
            left: 71.5%
        }

        #threadOpener, .msgPoster {
            font-weight: bold;
            font-size: 1.25em;
        }

        .threadMsg {
            margin: 10px 10px 10px 50px;

            border-radius: 15px;

            padding: 15px;

            background: rgb(219, 219, 219);
            width: 60%;
            display: flex;
            gap: 15px;
            flex-flow: column;
        }

        .threadMsg > .msgInfo {
            display: flex;
            gap: 15px;
        }

        .threadMsg > .closeRemoveBox {
            margin: 0;
            width: 75%;
        }

        .buttons {
            border: 1px solid #ccc;

            padding: 6px 12px;

            background: white;
            display: inline-block;

            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1em;

            cursor: pointer;
        }

        .buttons:hover {
            background: #ccc;
        }

        #wikiForumNames, #threadIDName {
            margin: 0;
        }

        img:not(.pfp) {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <!--Start of file input-->
    <div id="currentFile">File selected: None</div>

    <form id="fileForm">
        <label for="fileInput" id="fileUploadButton" class="buttons">Upload a forum archive</label>
        <input type="file" id="fileInput" style="display: none" accept=".json" onchange="fileUploaded()"/>
    
        <button id="fileLoadButton" class="buttons">Load file</button>
    </form>
    <button id="JSONterpret" class="buttons" style="margin-top:5px;">Interpret JSON</button>

    <div id="status">Status:</div>
    <!--End of file input-->

    <h1 id="wikiForumNames" style="display:none">wiki name - forum name</h1>
    <h2 id="threadIDName" style="display:none">thread id - thread name</h2>
    <div id="thread" style="display:none">

        <div id="closeBox" class="closeRemoveBox">
            <img class="pfp" id="closerPfp" src="https://web.archive.org/web/20170219164840im_/http://static.wikia.nocookie.net/a4417efd-b4e9-4e76-b906-2b92d26611c9/scale-to-width-down/50" width="30" height="30" alt="[user]">
            <div id="closeText">
                <div id="closeHeader">This thread was closed by [user] for the following reason:</div>
                <div id="closeReason">[text]</div>
                <div id="closeTime">[time]</div>
            </div>
        </div>
    
        <div id="openingMsg" class="threadMsg" data-msgID="1" data-threadID = "#">
            <img class="pfp" id="openerPfp" src="https://web.archive.org/web/20170219164840im_/http://static.wikia.nocookie.net/a4417efd-b4e9-4e76-b906-2b92d26611c9/scale-to-width-down/50" width="45" height="45" alt="[user]">
            <div id="openingInfo">
                <div class="kudosCount">[#] kudos</div>
                <h2 id="threadName">[thread name]</h2>
                <div id="threadOpener">Created by [user]</div>
                <div id="openingText">
                    [html]
                </div>
                <div id="openingTime">Edited by [user] at [time]</div>
            </div>
        </div>
    </div>

    <script>
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
                document.querySelector("#closerPfp").src = threadJSON.closingMessage.avatar;
                document.querySelector("#closerPfp").alt = threadJSON.closingMessage.closer;
                document.querySelector("#closeHeader").innerText = "This thread was closed by " + threadJSON.closingMessage.closer + " for the following reason:";
                document.querySelector("#closeReason").innerText = threadJSON.closingMessage.reason;
                document.querySelector("#closeTime").innerText = threadJSON.closingMessage.closingTime;
            } else document.querySelector("#closeBox").style = "display: none";

            var openingMessage = document.querySelector("#openingMsg");
            openingMessage.dataset.threadid = threadJSON.id;
            openingMessage.querySelector("#openerPfp").src = threadJSON.users.find(x => x.username === threadJSON.messages[0].poster).avatar;
            openingMessage.querySelector("#openerPfp").alt = threadJSON.messages[0].poster;
            openingMessage.querySelector(".kudosCount").innerText = threadJSON.messages[0].kudos + " kudos";
            openingMessage.querySelector("#threadName").innerText = threadJSON.threadName;
            openingMessage.querySelector("#threadOpener").innerText = threadJSON.messages[0].poster;
            openingMessage.querySelector("#openingText").innerHTML = threadJSON.messages[0].post;
            if (threadJSON.messages[0].editor) {
                openingMessage.querySelector("#openingTime").innerText = "Edited by " + threadJSON.messages[0].editor + " at " + threadJSON.messages[0].timePosted;
            } else openingMessage.querySelector("#openingTime").innerText = threadJSON.messages[0].timePosted;

            for (i = 1; i<threadJSON.messages.length; i++) {
                var threadMessage = document.createElement("div");
                threadMessage.setAttribute("class", "threadMsg");
                threadMessage.setAttribute("data-msgID", i+1);
                document.querySelector("#thread").appendChild(threadMessage);
                
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
        /**
        <div class="threadMsg" data-msgID="#">
            <div class="closeRemoveBox">
                <img class="pfp" src="[avatar]" width="30" height="30" alt="[user]">
                <div class="removeText">
                    <div class="removeHeader">This message was removed by [user] for the following reason:</div>
                    <div class="removeReason">[text]</div>
                    <div class="removeTime">[time]</div>
                </div>
            </div>
            <div class="msgInfo">
                <img class="pfp" src="[avatar]" width="45" height="45" alt="[user]">
                <div class="msgContent">
                    <div class="kudosCount">[#] kudos</div>
                    <div class="msgPoster">[user]</div>
                    <div class="msgText">
                        [html]
                    </div>
                    <div class="msgTime">Edited by [user] at [time]</div>
                </div>
            </div>
        </div>
        **/
    </script>
</body>
</html>
