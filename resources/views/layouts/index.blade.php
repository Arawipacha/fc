<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <base href="/">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ trans( 'general.app.title' ) }}</title>

    <!-- Styles -->
    <link type="text/css" rel="stylesheet" href="{{ asset( 'css/app.css' ) }}"  media="screen,projection" />

	<script src="bower_components/webcomponentsjs/webcomponents.js"></script>
	<script>
	  window.Polymer = {
		dom: 'shadow'
	  };
	</script>





<link rel="import" href="elements.html">
	
	
    <script src="libs/core-js/client/shim.min.js"></script>
    <script src="libs/zone.js/dist/zone.js"></script>
    <script src="libs/reflect-metadata/Reflect.js"></script>
    <script src="libs/systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token()
        ]); ?>

        //System.import('app').catch(function(err){ console.error(err); });
		
		document.addEventListener('WebComponentsReady', function() {
            System.import('app').catch(function(err){ console.error(err); });
        });
    </script>
</head>

<body>
    <my-app></my-app>
</body>
</html>