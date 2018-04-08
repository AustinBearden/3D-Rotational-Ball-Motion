//Author: Austin Bearden
//Date Created: 4/8/2108
//Project: PhysicsFoosball Approach 2

//Special thank to schteppe for providing cannon.js physics engine on github for public use.
//Here's a link: https://github.com/schteppe/cannon.js 

//execute calculations when button is clicked
function calculate_all() {

    //get values from input boxes
    var radius_input = parseFloat(document.getElementById('radiusID').value);
    console.log("Radius: " + radius_input);
    var time_input = parseFloat(document.getElementById('timeID').value);
    console.log("Time: " + time_input);
    var ang_velocity_input = parseFloat(document.getElementById('ang_velocityID').value);
    console.log("Angular Velocity: " + ang_velocity_input);
    var XYdirection_input = parseFloat(document.getElementById('XYdirectionID').value);
    console.log("XYdirection: " + XYdirection_input);

    //create the world
    var ball_world = new CANNON.World();
    ball_world.gravity.set(0,0,0); // meters per seconds-squared

    var x_ang_velocity = ang_velocity_input * Math.cos(XYdirection_input*Math.PI/180);
    console.log("X_Velocity_Component: " + x_ang_velocity);
    var y_ang_velocity = ang_velocity_input * Math.sin(XYdirection_input*Math.PI/180);
    console.log("Y_Velocity_Component: " + y_ang_velocity);

    var my_ball = new CANNON.Body({
        mass: 5,
        position: new CANNON.Vec3(0,0,0),
        shape: new CANNON.Sphere(radius_input),
        initAngularVelocity : new CANNON.Vec3(x_ang_velocity, y_ang_velocity, 0)

    });

    //my_ball.angularDamping = 0.1;

    ball_world.addBody(my_ball);

    // Create floor of ball world
    var world_ground = new CANNON.Body({

        mass: 0 // mass == 0 makes the body static

    });

    var ground_shape = new CANNON.Plane();
    world_ground.addShape(ground_shape);
    ball_world.addBody(world_ground);

    var ball_contact = new CANNON.ContactMaterial( ball_world, my_ball, 0.0, 0.0, 0.0);

    ball_world.addContactMaterial(ball_contact);

    ball_world.step(time_input);

    var X_final = my_ball.position.x;
    var Y_final = my_ball.position.y;
    //output to HTML page
    document.getElementById("x-axis").innerHTML = "X-Position: " + X_final + " meters";
    console.log("X position: " + my_ball.position.x);
    //output to HTML page
    document.getElementById("y-axis").innerHTML = "Y-Position: " + Y_final + " meters";
    console.log("Y position: " + my_ball.position.y);

}

//Accesses button from html
var calculate = document.getElementById("calculate");
calculate.addEventListener("click", function() { calculate_all(); } );