{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    //console.log($.noty.get(newPost.id));
                    $('#posts-list-container>ul').prepend(newPost);
                    
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>

            <p>
            ${post.content}
            <br>
            <small>
            ${post.username}
            </small>
            </p>
            <div class="post-comments">
                
                <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type Here to add comment.." required>
                        <input type="hidden" name="post" value="${post.id}">
                        <input type="submit" value="Add Comment">
                </form>
        
                <div class="posts-comments-list">
                    <ul id="post-comments-${post.id}">
                        
                    </ul>
        
                </div>
        
            </div>
        </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                
                }, error: function(err){
                    console.log(error.responseText);
                }

            });
        });
    }


    createPost();
}