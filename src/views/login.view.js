import logo from '../assets/img/ColPlanner.png';

export default () => (`
<div class="body">
<div class="section">
  <div class="container">
    <div class="row full-height justify-content-center">
      <div class="col-12 text-center align-self-center py-5">
      <a href="/"><img class="logo-login" src="${logo}" alt=""></a>
        <div class="section pb-5 pt-5 pt-sm-2 text-center">
          <h6 class="mb-0 pb-3"><span>Connexion</span><span>Inscription</span></h6>
          <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
          <label for="reg-log"></label>
          <div class="card-3d-wrap mx-auto">
            <div class="card-3d-wrapper">
              <div class="card-front">
                <div class="center-wrap">
                  <div class="section text-center">
                    <h4 class="mb-4 pb-3">Connection</h4>
                    <div class="form-group">

                      <input id="emaillogin" type="email" class="form-style" placeholder="Email">
                      <i class="input-icon uil uil-at"></i>

                    </div>
                    <div class="form-group mt-2">

                      <input id="passwordlogin" type="password" class="form-style" placeholder="Password">
                      <i class="input-icon uil uil-lock-alt"></i>

                    </div>
                    <p style="color: red; height: 1rem;" id="error-singIn"></p>
                    <a id='singIn' href="" class="btn mt-2">Connection</a>
                    <p class="mb-0 mt-3 text-center"><a href="" class="link">Vous avez oubliez votre mot de passe ?</a></p>
                  </div>
                </div>
              </div>
              <div class="card-back">
                <div class="center-wrap">
                  <div class="section text-center">
                    <h4 class="mb-3 pb-3">Inscription</h4>
                    <div class="form-group">

                      <input id="fullname" type="text" class="form-style" placeholder="Votre nom">
                      <i class="input-icon uil uil-user"></i>

                    </div>
                    <div class="form-group mt-2">

                      <input id="email" type="email" class="form-style" placeholder="Email">
                      <i class="input-icon uil uil-at"></i>

                    </div>
                    <div class="form-group mt-2">

                      <input id="password" type="password" class="form-style" placeholder="Mot de passe">
                      <i class="input-icon uil uil-lock-alt"></i>

                    </div>
                    <div class="form-group mt-2">

                      <input id="passwordconfirm" type="password" class="form-style" placeholder="Confrimer votre mot de passe">
                      <i class="input-icon uil uil-lock-alt"></i>

                    </div>
                    <p style="color: red; height: 1rem;" id="error-singUp"></p>
                    <a id="singUp" href="" class="btn mt-2">Register</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`);
