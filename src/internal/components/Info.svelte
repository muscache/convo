<!-- 
  Info bar that is shown on the top of chat window
-->
<script lang="ts">
  import { profileName, profileAbout, profilePicture } from "../../settings";
</script>

<div class="info">
  <div
    class="profile-photo"
    style="background-image: url('{profilePicture}')"
  />
  <div class="profile">
    <b class="name">{profileName}</b>
    <div class="about">{profileAbout}</div>
  </div>
</div>

<style>
  .info {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 16px;
    padding: 12px 24px;
    border-bottom: 1px solid #dedede;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
    user-select: none;
  }
  .info .profile-photo {
    height: 36px;
    width: 36px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .profile .name {
    color: #222;
    margin: 0;
    font-size: 1.2em;
  }
  .profile .about {
    font-size: 0.8em;
    color: #666;
  }
</style>
