/* append(origin, to_append)
 * Append *to_append* to *origin* right before file extension.
 * For example, append("file.png", "_appended") gives "file_appended.png"
 */
function append(origin, to_append)
{
  return "".concat(
      origin.slice(0, -4)
      , to_append
      , origin.slice(origin.length - 4)
  );
}

/* unappend(origin, to_unappend)
 * Opposite function of append(origin, to_append).
 */
function unappend(origin, to_unappend)
{
  return "".concat(
      origin.slice(0, - to_unappend.length - 4)
      , origin.slice(origin.length - 4)
  );
}

/* attach_events()
 * Attach onmouseover and onmouseout event to each img element in the menu div
 * to change the source from src.png to src_hover.png when hovered, back to
 * src.png when out.
 */
function attach_events()
{
  var elements = document.getElementById("menu").getElementsByTagName("img");

  for (var i = 0; i < elements.length; i++)
  {
    elements[i].addEventListener("mouseover", function() {
      // edge case for "_selected" menu entry
      if (this.className == "selected")
      {
        this.src = unappend(this.src, "_selected");
      }
      this.src = append(this.src, "_hover");
    });
    elements[i].addEventListener("mouseout", function() {
      this.src = unappend(this.src, "_hover");
      // edge case for "_selected" menu entry
      if (this.className == "selected")
      {
        this.src = append(this.src, "_selected");
      }
    });
  }
}

/* select_button(button)
 * add the class "selected" and change the image source of *button
 */
function select_button(button)
{
  button.className = "selected";
  button.src = append(button.src, "_selected");
}
/* set_selected_button()
 * Change the source of the img element that match the current page.
 */
function set_selected_button()
{
	switch(location.pathname.split("/").pop())
  {	
		case "download.html":
      select_button(document.getElementById("download"));
		break;
		case "patcher.html":
      select_button(document.getElementById("patcher"));
		break;
		case "equipe.html":
      select_button(document.getElementById("equipe"));
		break;
		case "contact.html":
      select_button(document.getElementById("contact"));
		break;
		default:
      select_button(document.getElementById("accueil"));
		break;
	}
}

// Call functions when the DOM is fully loaded and parsed
document.addEventListener("DOMContentLoaded", function() {
  set_selected_button();
  attach_events();
});
