export default () => (`
<div class="container-financecol">
<div class="solde-financecol">
  <p class="sold-title-financecol">Your solde -35 €</p>
</div>
<div class="you-owe-financecol">
  <p class="you-owe-title-financecol">You owe to</p>
  <div class="you-owe-content-financecol">
    <div class="line">
      <p class="who">Robert</p>
      <button class="pay button">Pay</button>
      <p class="mutch">35 €</p>
    </div>
  </div>
</div>
<div class="last-expence-financecol">
  <p class="last-expence-title-financecol">Last expence</p>
  <div class="last-expence-content-financecol">
    <div class="line">
      <p class="title">Course</p>
      <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ipsam.</p>
      <p class="price">122 €</p>
      <p class="who">By Alice</p>
      <div class="edit">
        <button class="button delete">Delete</button>
        <button class="button edit-">Édit</button>
      </div>
    </div>
  </div>
</div>
<div class="owe-you-financecol">
  <p class="owe-you-title-financecol">Owe you to</p>
  <div class="owe-you-content-financecol">
    <div class="line">
      <p class="who">Alice</p>
      <button class="pay button">Pay</button>
      <p class="mutch">10 €</p>
    </div>
  </div>
</div>
<div class="add-expence-financecol">
  <p class="add-expence-title-financecol">Add expence</p>
  <form>
    <div class="input-container">
      <label for="expence">Expence</label>
      <input type="text" name="expence" placeholder="Expence">

      <label for="price">Price</label>
      <input type="text" name="price" placeholder="Price">
    </div>
    <label for="description">Description</label>
    <textarea name="description" placeholder="Description"></textarea>

    <input type="submit" value="Submit">
  </form>

</div>
</div>
`);
