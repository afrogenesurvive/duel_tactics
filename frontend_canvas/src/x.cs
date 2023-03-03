
.ToString("MM/dd/yyyy")

string path = Environment.CurrentDirectory;
path = path.Substring(0, Environment.CurrentDirectory.Length - 17);
var stream = File.OpenRead(Path.Combine(path, @"AppData/csv/Timesheet1.csv"));


var directory = $"{Path.GetDirectoryName(context.DeploymentDirectory)}\\net6.0\\AppData\\csv\\Timesheet1.csv";
var stream = File.OpenRead(directory);


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------
